import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User, Tale, TaleType } from '../../models';
import { AuthService, TaleService } from '../../services';
import { HelpActionPledgeModal, HelpAvocadometerModal } from '../../modals';
import { PopoverComponent } from '../../components/popover/popover.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  user: User;
  tales: Tale[] = [];
  mostRecentActions = [];
  private unsubscribe$: Subject<void> = new Subject();
  
  constructor(
    private router: Router,
    private title:Title,
    private authService: AuthService,
    private _tale: TaleService,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
    this.title.setTitle('Halo Tales - Welcome');
    this.authService.user
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => this.user = res);
  }
  
  ngOnInit() {
    this._tale.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
          console.log('res:', res);
          let data = res as Tale[]; //Convert the result to an array of Stories
          for (var i=0; i<data.length; i++) {
            this.tales.push(data[i]);
          }
        },
        error => { 
          console.log("Error in recieving data"); 
        },
        ()   => {
          // console.log( this.tales );
        }
      );
    this.mostRecentActions = [
      {
        'userId' : '2r22fw2f',
        'photoURL' : "/assets/sample-images/user/person_1.jpg",
        'displayName' : 'Hank Aaron',
        'actionIcon' : 'hand',
        'relatedTaleTitle' : '',
        'relatedTaleSlug' : '',
        'relatedTestamonial' : ''
      },
      {
        'userId' : 'qv4tc4a3',
        'photoURL' : "/assets/sample-images/user/person_3.jpg",
        'displayName' : 'Frank Abagnale',
        'actionIcon' : 'quote',
        'relatedTaleTitle' : '',
        'relatedTaleSlug' : '',
        'relatedTestamonial' : 'In the case of a dynamically loaded component and in order for a ComponentFactory to be generated, the component must also be added to the module’s entryComponents'
      },
      {
        'userId' : 'wv4s4rt4',
        'photoURL' : "/assets/sample-images/user/person_5.jpg",
        'displayName' : 'Edward Abbey',
        'actionIcon' : 'trophy',
        'relatedTaleTitle' : 'How Does Halo Tales Empower People To Fight Corporate Power?',
        'relatedTaleSlug' : 'how-does-halo-tales-empower-people-to-fight-corporate-power',
        'relatedTestamonial' : ''
      },
      {
        'userId' : 'qcwafwert3',
        'photoURL' : "/assets/sample-images/user/person_6.jpg",
        'displayName' : 'James Abourezk',
        'actionIcon' : 'hand',
        'relatedTaleTitle' : '',
        'relatedTaleSlug' : '',
        'relatedTestamonial' : ''
      },
      {
        'userId' : '562wcrtr3wt4',
        'photoURL' : "/assets/sample-images/user/person_7.jpg",
        'displayName' : 'Jane Ace',
        'actionIcon' : 'hand',
        'relatedTaleTitle' : '',
        'relatedTaleSlug' : '',
        'relatedTestamonial' : ''
      }
    ]
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get pledgesCount(): number {
    return (this.user && this.user.pledges) ? this.user.pledges.length : null;
  }

  get talesCount(): number {
    return (this.user && this.user.tales) ? this.user.tales.length : null;
  }

  async onAvatarClick(ev: Event, userId: String, userDisplayName: String, relatedTaleTitle: String, relatedTaleSlug: String, relatedTestamonial: String) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {
        userId: userId,
        userDisplayName: userDisplayName,
        relatedTaleTitle: relatedTaleTitle,
        relatedTaleSlug: relatedTaleSlug,
        relatedTestamonial: relatedTestamonial
      },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  register() {
    this.router.navigate(['register']);
  }

  get isFirstPageThisSession(): boolean {
    return this.user && this.user.hasSeenNewCorpThisSession ? false : true;
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
