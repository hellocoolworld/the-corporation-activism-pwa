import { Component, OnInit, OnDestroy, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Extender, SocialAuthProvider } from 'src/app/helpers';
import { Setting } from 'src/app/models';
import { SettingsService, ScreenService, CommonService } from 'src/app/services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends Extender implements OnInit, OnDestroy {
  isDesktop: boolean;
  public provider = SocialAuthProvider;
  public settings: Setting;
  constructor(
    protected injector: Injector,
    @Inject(DOCUMENT) private document,
    private settingsService: SettingsService,
    private screenService: ScreenService,
    private commonService: CommonService
  ) {
    super(injector);
  }


  ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
    this.screenService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  get isHome() {
    console.log('this.document.location.pathname ', this.document.location.pathname);
    let test = false;
    if (this.document.location.pathname === '/') {
      test = true;    
    }
    console.log('test: ', test);
    return test;
  }

  get copyrightYear() {
    return new Date().getFullYear();
  }
  
  linkToSocialProfile(p: number) {
    console.log('p: ', p);
    this.commonService.openSocialProvider(p);
  }

  ngOnDestroy() {
    console.log('bye');
  }
}
