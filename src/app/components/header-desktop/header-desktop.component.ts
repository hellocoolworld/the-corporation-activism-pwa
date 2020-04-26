import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { SettingsService, CommonService } from '../../services';
import { Setting } from 'src/app/models';
import { Extender, SocialAuthProvider } from 'src/app/helpers';


@Component({
  selector: 'ht-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss']
})
export class HeaderDesktopComponent extends Extender implements OnInit, OnDestroy {
  public provider = SocialAuthProvider;
  public settings: Setting;
  constructor(
    protected injector: Injector,
    private settingsService: SettingsService,
    private commonService: CommonService) {
    super(injector);
  }

  ngOnInit() {
   this.settings = this.settingsService.getAllSettings();
  }

  linkToSocialProfile(p: number) {
    this.commonService.openSocialProvider(p);
  }

  join() {
    this.router.navigate(['join']);
  }

  ngOnDestroy() {
    console.log('bye');
  }

}
