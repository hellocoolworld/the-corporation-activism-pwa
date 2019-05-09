import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User, Story, StoryType } from '../_models';
import { AuthService, StoryService } from '../_services';
import { HelpActionPledgePage, HelpAvocadometerPage } from '../_modals';
import { PopoverComponent } from '../_components/popover/popover.component';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  currentUser: User;
  stories: Story[] = [];
  private unsubscribe$: Subject<void> = new Subject();
  
  constructor(
    private router: Router,
    private _auth: AuthService,
    private _story: StoryService,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
    this._auth.currentUser
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => this.currentUser = res);
  }

  ngOnInit() {
    this._story.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          let data = result as Story[]; //Convert the result to an array of Stories
          for (var i=0; i<data.length; i++) {
            this.stories.push(data[i]);
          }
        },
        error => { 
          console.log("Error in recieving data"); 
        },
        ()   => {
          // console.log( this.stories );
        }
      );
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  pledgesCount():number {
    return this.currentUser.pledges.length;
  }
  storiesCount():number {
    return this.currentUser.stories.length;
  }

  async onAvatarClick(ev: Event) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {
        user_id: 123,
        displayProperty: 'testimonial'
      },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  signUp() {
    this.router.navigate(['signup']);
  }

  async showHelpActionPledgeModal() {
    const modal = await this.modalController.create({
      component: HelpActionPledgePage
    });
    return await modal.present();
  }
  async showHelpAvocadometerModal() {
    const modal = await this.modalController.create({
      component: HelpAvocadometerPage
    });
    return await modal.present();
  }


}
