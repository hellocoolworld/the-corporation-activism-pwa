import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Extender } from '../../helpers/extender';
import { Setting } from '../../models/setting';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-home-static',
  templateUrl: './home-static.component.html',
  styleUrls: ['./home-static.component.scss'],
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
