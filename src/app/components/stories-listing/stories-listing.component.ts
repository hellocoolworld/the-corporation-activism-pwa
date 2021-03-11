import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Extender } from '../../helpers/extender';
import { HelpActionPledgeModal, HelpAvocadometerModal } from '../../modals';
import { Setting } from '../../models/setting';
import { Story } from '../../models/story';
import { ScreenService } from '../../services/screen.service';
import { SettingsService } from '../../services/settings.service';
import { StoriesService } from '../../services/stories.service';


@Component({
  selector: 'app-stories-listing',
  templateUrl: './stories-listing.component.html',
  styleUrls: ['./stories-listing.component.scss']
})
export class StoriesListingComponent extends Extender implements OnInit, OnDestroy {
  settings: Setting;
  stories: Story[] = [];

  isDesktop: boolean;
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
    // console.log('this.settings: ', this.settings);
    this.storyService.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
        //   console.log('res:', res);
          const data = res as Story[]; // Convert the result to an array of Stories
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < data.length; i++) {
            if (data[i].show) {
                this.stories.push(data[i]);
            }
          }
          this.stories.sort((s1,s2) => {
            return s1.order-s2.order;
          })
        },
        error => {
          console.log('error: ', error);
        },
        ()   => {
        //   console.log( this.stories );
        }
      );
    this.screenService.isDesktopView().subscribe(isDesktop => {
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
