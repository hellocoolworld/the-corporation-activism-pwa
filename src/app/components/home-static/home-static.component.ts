import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Extender } from 'src/app/helpers';
import { Setting } from 'src/app/models';
import { SettingsService } from 'src/app/services';

@Component({
  selector: 'app-home-static',
  templateUrl: './home-static.component.html',
  styleUrls: ['./home-static.component.scss']
})
export class HomeStaticComponent extends Extender implements OnInit, OnDestroy {
  settings: Setting;
  constructor(
    protected injector: Injector,
    private settingsService: SettingsService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
  }

  ngOnDestroy() {
  }

}
