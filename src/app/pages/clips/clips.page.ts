import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Extender } from 'src/app/helpers';
import { Clip, Setting } from 'src/app/models';
import { SettingsService, ClipsService, ScreenService } from 'src/app/services';


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
    private modalController: ModalController,
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
          console.log(error, 'Error in recieving data'); 
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
