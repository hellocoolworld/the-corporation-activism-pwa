import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../_models';
import { UserService, AuthService } from '../../_services';

@Component({
  selector: 'ht-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private _user: UserService
    ) {
      this.currentUser = this._auth.currentUserValue;
    }

  ngOnInit() {
  }

}
