import { Component, OnInit, OnDestroy, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Extender } from 'src/app/helpers';
import { Setting } from 'src/app/models';
import { SettingsService, ScreenService } from 'src/app/services';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Extender implements OnInit, OnDestroy {
  isDesktop: boolean;
  public settings: Setting;
  constructor(
    protected injector: Injector,
    @Inject(DOCUMENT) private document,
    private settingsService: SettingsService,
    private screenService: ScreenService
  ) {
    super(injector);
  }


  ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
    this.screenService.isDesktopView().subscribe(isDesktop => {
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

  get showJoin() {
    let test: boolean = !this.settings.deviceToken;
    if (this.document.location.pathname.indexOf('join') !== -1) {
      test = false;
    }
    return test;
  }
  
  goToUrl(url): void {
    this.document.location.href = url;
  }

  ngOnDestroy() {
    console.log('bye');
  }
}
