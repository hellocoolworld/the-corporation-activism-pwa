import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../models';
import { UserService, AuthService } from '../../services';

@Component({
  selector: 'ht-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss']
})
export class HeaderDesktopComponent implements OnInit, OnDestroy {
  currentUser: User;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private _auth: AuthService,
    private _user: UserService
  ) {
    this._auth.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => this.currentUser = res);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
