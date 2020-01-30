import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '../../models';
import { UserService, AuthService } from '../../services';
import { SocialAuthProvider } from 'src/app/helpers/constants';


@Component({
  selector: 'ht-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss']
})
export class HeaderDesktopComponent implements OnInit, OnDestroy {
  user: IUser;
  private unsubscribe$: Subject<void> = new Subject();
  public provider = SocialAuthProvider;
  constructor(
    private router: Router,
    private authService: AuthService,
    private _user: UserService
  ) {
    //
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

  linkToSocialProfile(ß) {

  }

  signUp() {
    //
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
