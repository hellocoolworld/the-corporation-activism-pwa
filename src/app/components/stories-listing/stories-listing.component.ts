import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Extender } from 'src/app/helpers';
import { Story, Setting } from 'src/app/models';
import { SettingsService, StoriesService, ScreenService } from 'src/app/services';
import { HelpActionPledgeModal, HelpAvocadometerModal } from 'src/app/modals';


@Component({
  selector: 'app-stories-listing',
  templateUrl: './stories-listing.component.html',
  styleUrls: ['./stories-listing.component.scss']
})
export class StoriesListingComponent extends Extender implements OnInit, OnDestroy {
  settings: Setting;
  stories: Story[] = [];
  
  isDesktop:boolean;
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    protected injector: Injector,
    private settingsService: SettingsService,
    private storyService: StoriesService,
    private modalController: ModalController,
    private screenService: ScreenService
      ) {
    super(injector);
  }

  ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
    console.log('this.settings: ', this.settings);
    this.storyService.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
          console.log('res:', res);
          const data = res as Story[]; //Convert the result to an array of Stories
          for (let i = 0; i < data.length; i++) {
            this.stories.push(data[i]);
          }
        },
        error => { 
          console.log('error: ', error); 
        },
        ()   => {
          console.log( this.stories );
        }
      );
      this.screenService.isDesktopView().subscribe(isDesktop => {
        console.log('isDesktop: ', isDesktop);
        this.isDesktop = isDesktop;
      });
  }

  get storiesGridSize() {
    return this.isDesktop ? 6 : 12;
  }

  async showHelpActionPledgeModal() {
    const modal = await this.modalController.create({
      component: HelpActionPledgeModal
    });
    return await modal.present();
  }

  async showHelpAvocadometerModal() {
    const modal = await this.modalController.create({
      component: HelpAvocadometerModal
    });
    return await modal.present();
  }
  

  ngOnDestroy() {
  }

}
