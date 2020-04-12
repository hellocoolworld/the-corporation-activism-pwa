import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Extender } from 'src/app/helpers';
import { User, Story, StoryType } from '../../models';
import { AuthService, StoriesService } from '../../services';
import { HelpActionPledgeModal, HelpAvocadometerModal } from '../../modals';
import { PopoverComponent } from '../../components/popover/popover.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage extends Extender implements OnInit, OnDestroy {
  user: User;
  stories: Story[] = [];
  private unsubscribe$: Subject<void> = new Subject();
  
  constructor(
    protected injector: Injector,
    private title:Title,
    private authService: AuthService,
    private storyService: StoriesService,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
    super(injector);
    this.title.setTitle('The Corporation - Welcome');
    this.authService.user
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => this.user = res);
  }
  
  ngOnInit() {
    this.storyService.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
          console.log('res:', res);
          let data = res as Story[]; //Convert the result to an array of Stories
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
  }

  get pledgesCount(): number {
    return (this.user && this.user.pledges) ? this.user.pledges.length : null;
  }

  get storiesCount(): number {
    return (this.user && this.user.stories) ? this.user.stories.length : null;
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
