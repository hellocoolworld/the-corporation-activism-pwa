import { Component, OnInit, OnDestroy, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Extender } from 'src/app/helpers';
import { Setting } from 'src/app/models';
import { SettingsService } from 'src/app/services';
@Component({
  selector: 'ht-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends Extender implements OnInit, OnDestroy {
  public settings: Setting;
  constructor(
    protected injector: Injector,
    @Inject(DOCUMENT) private document,
    private settingsService: SettingsService
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
    console.log('hi');
  }

  get showJoin() { 
    let test:boolean = !this.settings.deviceToken;
    if (this.document.location.pathname.indexOf('join') !== -1) {
      test = false;
    }
    console.log('test: ', test);
    return test;
  }

  ngOnDestroy() {
    console.log('bye');
  }
}
