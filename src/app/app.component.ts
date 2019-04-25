import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController } from '@ionic/angular';

import { AuthService } from './_services';
import { User } from './_models';

import { PrivacyPolicyPage, TermsOfServicePage } from './_modals';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  public currentUser: User;

  constructor(
    private platform: Platform,
    private router: Router,
    private _auth: AuthService,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this._auth.currentUser.subscribe(res => this.currentUser = res);
    this.platform.ready().then(() => {
    });
  }

  logout() {
    this._auth.logout();
    this.router.navigate(['/login']);
  }

  linkToSocialProfile(provider: String) {
    if (provider === 'facebook') {
      window.open('https://facebook.com', '_blank');

    } else if (provider === 'twitter') {
      window.open('https://twitter.com', '_blank');

    } else if (provider === 'instagram') {
      window.open('https://instagram.com', '_blank');
    }
  }

  async showTermsModal() {
    const modal = await this.modalController.create({
      component: TermsOfServicePage
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyPage
    });
    return await modal.present();
  }


}
