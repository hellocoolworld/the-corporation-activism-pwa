import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { AuthService } from './_services';
import { User } from './_models';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  public currentUser: User;

  constructor(
    private platform: Platform,
    private router: Router,
    private _auth: AuthService
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
}
