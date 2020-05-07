import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Extender } from 'src/app/helpers';
import { Story, Setting } from 'src/app/models';
import { SettingsService, StoriesService } from 'src/app/services';
import { HelpActionPledgeModal, HelpAvocadometerModal } from 'src/app/modals';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage extends Extender implements OnInit, OnDestroy {
  settings: Setting;
  stories: Story[] = [];
  
  private unsubscribe$: Subject<void> = new Subject();
  
  constructor(
    protected injector: Injector,
    private title: Title,
    private settingsService: SettingsService,
    private storyService: StoriesService,
    private modalController: ModalController,
      ) {
    super(injector);
  }

  ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
    this.title.setTitle('The New Corporation - Welcome');
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
          console.log('Error in recieving data'); 
        },
        ()   => {
          // console.log( this.stories );
        }
      );
    
  }

  ngOnDestroy() {
  }

  join() {
    this.router.navigate(['join']);
  }

  get isFirstPageThisSession(): boolean {
    return this.settings.seenAnimation ? false : true;
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


}
