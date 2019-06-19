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
  relatedTaleTitle: String = null;
  relatedTaleSlug: String = null;
  relatedTestamonial: String = null;

  constructor(private router: Router, private navParams: NavParams, private popoverController: PopoverController) { }

  ngOnInit() {
    this.userId = this.navParams.get('userId');
    this.userDisplayName = this.navParams.get('userDisplayName');
    this.relatedTaleTitle = this.navParams.get('relatedTaleTitle');
    this.relatedTaleSlug = this.navParams.get('relatedTaleSlug');
    this.relatedTestamonial = this.navParams.get('relatedTestamonial');
  }

  loadUserProfile(userId: String) {
    this.router.navigate(['profile/'+userId]);
    this.dismiss();
  }

  loadTale(taleSlug: String) {
    this.router.navigate(['tale/'+taleSlug]);
    this.dismiss();
  }

  dismiss(): void {
    this.popoverController.dismiss();
  }

}
