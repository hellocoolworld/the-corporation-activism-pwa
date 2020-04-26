import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController, MenuController } from '@ionic/angular';


import { PrivacyPolicyModal, TermsOfServiceModal } from './modals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  constructor(
    private platform: Platform,
    private router: Router,
    private menuController: MenuController,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

 
 
  async initializeApp() {
    this.platform.ready().then(() => {
    });
  }
 d
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

  get copyrightYear() {
    return new Date().getFullYear();
  }


}
