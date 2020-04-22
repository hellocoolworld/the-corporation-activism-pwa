import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService, CommonService } from '../../services';
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
    protected injector: Injector,
    private router: Router,
    private settingsService: SettingsService,
    private commonService : CommonService
  ) {
    super(injector);
  }
  /** maybe if we need o call rest service to find out if the userTotken in the perrfeces serice is valid */
  //async ngOnInit() {
  //  this.user = await this.authService.getUser();
  //}

  linkToSocialProfile(p:number) {
    this.commonService.openSocialProvider(p);
  }

  join() {
    this.router.navigate(['join']);
  }

  ngOnDestroy() {
    
  }

}
