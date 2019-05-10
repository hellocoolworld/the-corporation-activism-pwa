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
  mostRecentActions = [];
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
    this.mostRecentActions = [
      {
        'userId' : '2r22fw2f',
        'imageUrl' : "/assets/sample-images/user/person_1.jpg",
        'displayName' : 'Hank Aaron',
        'actionIcon' : 'hand',
        'relatedStoryTitle' : '',
        'relatedStorySlug' : '',
        'relatedTestamonial' : ''
      },
      {
        'userId' : 'qv4tc4a3',
        'imageUrl' : "/assets/sample-images/user/person_3.jpg",
        'displayName' : 'Frank Abagnale',
        'actionIcon' : 'quote',
        'relatedStoryTitle' : '',
        'relatedStorySlug' : '',
        'relatedTestamonial' : 'In the case of a dynamically loaded component and in order for a ComponentFactory to be generated, the component must also be added to the module’s entryComponents'
      },
      {
        'userId' : 'wv4s4rt4',
        'imageUrl' : "/assets/sample-images/user/person_5.jpg",
        'displayName' : 'Edward Abbey',
        'actionIcon' : 'trophy',
        'relatedStoryTitle' : 'How Does Halo Tales Empower People To Fight Corporate Power?',
        'relatedStorySlug' : 'how-does-halo-tales-empower-people-to-fight-corporate-power',
        'relatedTestamonial' : ''
      },
      {
        'userId' : 'qcwafwert3',
        'imageUrl' : "/assets/sample-images/user/person_6.jpg",
        'displayName' : 'James Abourezk',
        'actionIcon' : 'hand',
        'relatedStoryTitle' : '',
        'relatedStorySlug' : '',
        'relatedTestamonial' : ''
      },
      {
        'userId' : '562wcrtr3wt4',
        'imageUrl' : "/assets/sample-images/user/person_7.jpg",
        'displayName' : 'Jane Ace',
        'actionIcon' : 'hand',
        'relatedStoryTitle' : '',
        'relatedStorySlug' : '',
        'relatedTestamonial' : ''
      }
    ]
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

  async onAvatarClick(ev: Event, userId: String, userDisplayName: String, relatedStoryTitle: String, relatedStorySlug: String, relatedTestamonial: String) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {
        userId: userId,
        userDisplayName: userDisplayName,
        relatedStoryTitle: relatedStoryTitle,
        relatedStorySlug: relatedStorySlug,
        relatedTestamonial: relatedTestamonial
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
