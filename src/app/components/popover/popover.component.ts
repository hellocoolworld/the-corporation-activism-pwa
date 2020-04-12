import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'ht-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  userId: String = null;
  userDisplayName: String = null;
  relatedStoryTitle: String = null;
  relatedStorySlug: String = null;
  relatedTestamonial: String = null;

  constructor(private router: Router, private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.userId = this.navParams.get('userId');
    this.userDisplayName = this.navParams.get('userDisplayName');
    this.relatedStoryTitle = this.navParams.get('relatedStoryTitle');
    this.relatedStorySlug = this.navParams.get('relatedStorySlug');
    this.relatedTestamonial = this.navParams.get('relatedTestamonial');
  }

  loadUserProfile(userId: String) {
    this.router.navigate(['profile/'+userId]);
    this.dismiss();
  }

  loadStory(storySlug: String) {
    this.router.navigate(['story/'+storySlug]);
    this.dismiss();
  }

  dismiss(): void {
    this.popoverController.dismiss();
  }

}
