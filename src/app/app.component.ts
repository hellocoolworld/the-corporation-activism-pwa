import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController, MenuController } from '@ionic/angular';

import { AuthService } from './services';
import { User } from './models';

import { PrivacyPolicyModal, TermsOfServiceModal } from './modals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
    this._auth.user.subscribe(res => this.currentUser = res);
    this.platform.ready().then(() => {
    });
  }

  logout() {
    this._auth.signOut();
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
      component: TermsOfServiceModal
    });
    return await modal.present();
  }

  async showPrivacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyModal
    });
    return await modal.present();
  }


}
