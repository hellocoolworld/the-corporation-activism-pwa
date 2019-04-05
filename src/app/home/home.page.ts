import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../_models';
import { UserService, AuthService } from '../_services';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private _auth: AuthService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}


  signUp() {
    this.router.navigate(['signup']);
  }


  // Get User Profile
  // async getProfile() {
  //   this.authService
  //     .getUserProfile()
  //     .get()
  //     .subscribe(user => {
  //       this.userProfile = user.data();
  //       this.storage.set('user', this.userProfile);
  //       this.JoinTheCrowedBlock = false;
  //     });
  // }

}
