import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    private settingsService: SettingsService
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
    console.log('hi');
  }

  get showJoin() { 
    const test:boolean = !this.settings.deviceToken;
    console.log('test: ', test);
    return test;
  }

  ngOnDestroy() {
    console.log('bye');
  }
}
