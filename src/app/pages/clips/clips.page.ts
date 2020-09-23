import { Component, Injector, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Extender } from '../../helpers/extender';
import { Clip } from '../../models/clip';
import { Setting } from '../../models/setting';
import { ClipsService } from '../../services/clip.service';
import { ScreenService } from '../../services/screen.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.page.html',
  styleUrls: ['./clips.page.scss'],
})
export class ClipsPage extends Extender implements OnInit {

  settings: Setting;
  clips: Clip[] = [];
  isDesktop: boolean;
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    protected injector: Injector,
    private settingsService: SettingsService,
    private clipsService: ClipsService,
    private screenService: ScreenService
      ) {
    super(injector);
  }

  ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
    console.log('this.settings: ', this.settings);
    this.clipsService.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        res => {
          console.log('res:', res);
          const data = res as Clip[];
          this.clips = data.filter(clip => clip.show);
        },
        error => {
          console.log(error, 'Error in receiving data');
        }
      );
    this.screenService.isDesktopView().subscribe(isDesktop => {
        console.log('isDesktop: ', isDesktop);
        this.isDesktop = isDesktop;
      });
  }

  get clipsGridSize() {
    return this.isDesktop ? 6 : 12;
  }
}

