import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController, MenuController } from '@ionic/angular';

import { AuthService } from './services';
import { User } from './models';

import { PrivacyPolicyPage, TermsOfServicePage } from './modals';


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
    private menuController: MenuController,
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
    this.router.navigate(['/']);
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

  close(): void {
    this.menuController.close();
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
