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
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  
  get isNotHome() {
    console.log('this.document.location.pathname ', this.document.location.pathname);
    if (this.document.location.pathname === '') {
      return false;
    }
    return true;
  }

  get showJoin() {
    let test: boolean = !this.settings.deviceToken;
    if (this.document.location.pathname.indexOf('join') !== -1) {
      test = false;
    }
    return test;
  }

  ngOnDestroy() {
    console.log('bye');
  }
}
