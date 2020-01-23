import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController, MenuController } from '@ionic/angular';

import { AuthService } from './services';
import { IUser } from './models';

import { PrivacyPolicyModal, TermsOfServiceModal } from './modals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent {
  public user: IUser;

  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService,
    private menuController: MenuController,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.user = await this.authService.getUser();
    this.platform.ready().then(() => {
    });
  }

  logout() {
    this.authService.signOut();
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
