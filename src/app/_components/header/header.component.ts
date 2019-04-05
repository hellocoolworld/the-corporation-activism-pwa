import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../_models';
import { UserService, AuthService } from '../../_services';

@Component({
  selector: 'ht-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private _user: UserService
    ) {
      this.currentUserSubscription = this._auth.currentUser.subscribe(
        res => {
          this.currentUser = res;
        });
    }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }
}
