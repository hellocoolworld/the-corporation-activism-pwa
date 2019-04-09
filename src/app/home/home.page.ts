import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../_models';
import { AuthService } from '../_services';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private _auth: AuthService
  ) {
    this.currentUser = this._auth.currentUserValue;
  }

  ngOnInit() {
  }


  signUp() {
    this.router.navigate(['signup']);
  }


}
