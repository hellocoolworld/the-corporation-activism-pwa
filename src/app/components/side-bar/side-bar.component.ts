import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { SettingsService, CommonService } from '../../services';
import { Setting } from 'src/app/models';
import { Extender, SocialAuthProvider } from 'src/app/helpers';


@Component({
  selector: 'app-sid-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent extends Extender implements OnInit, OnDestroy {
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
    console.log('p: ', p);
    this.commonService.openSocialProvider(p);
  }

  join() {
    console.log('join');
    this.router.navigate(['join']);
  }

  ngOnDestroy() {
    console.log('bye');
  }

}
