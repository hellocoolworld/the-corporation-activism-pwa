import { Component, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { Extender } from 'src/app/helpers';
import { Setting } from 'src/app/models';
import { SettingsService } from 'src/app/services';


@Component({
  selector: 'app-home-intro',
  templateUrl: './home-intro.component.html',
  styleUrls: ['./home-intro.component.scss']
})
export class HomeIntroComponent extends Extender implements OnInit {
  settings: Setting;
  @Output() skipIntro: EventEmitter<boolean> = new EventEmitter();

  constructor(
    protected injector: Injector,
    private settingsService: SettingsService
      ) {
    super(injector);
  }

  public skip() {
    this.skipIntro.emit(true);
  }
  ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
  }

}
