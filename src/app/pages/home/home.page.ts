import { Component, OnInit, OnDestroy, Injector, Inject } from '@angular/core';
import { Extender } from 'src/app/helpers';
import { DOCUMENT } from '@angular/common';
import { Story, Setting } from 'src/app/models';
import { Observable, Subscription, timer } from 'rxjs';
import { SettingsService, ScreenService } from 'src/app/services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage extends Extender implements OnInit, OnDestroy {

  stories: Story[] = [];
  isDesktop: boolean;
  private subscription: Subscription;
  private timer: Observable<any>;
  seenAnimation: boolean;

  constructor(
    protected injector: Injector,
    private title: Title,
    private settingsService: SettingsService,
    private screenService: ScreenService,
    @Inject(DOCUMENT) private document
      ) {
    super(injector);
  }

  ngOnInit() {
    this.seenAnimation = this.settingsService.getSetting('seenAnimation');
    console.log('this.settings: ', this.settingsService.getAllSettings());
    this.title.setTitle('The New Corporation - Welcome');
    this.screenService.isDesktopView().subscribe(isDesktop => {
      this.isDesktop = isDesktop;
    });
    this.setTimer();
  }

public setTimer(){

    this.timer        = timer(16000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        console.log('time out');
        this.skipIntro();
    });
  }

  public skipIntro() {
    this.settingsService.saveSetting('seenAnimation',true);
    this.seenAnimation = true;
  }

  public ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      console.log('destry');
      this.subscription.unsubscribe();
    }
  }
/*
  get seenAnimation(): boolean {
    const test: boolean = this.settingsService.getSetting('seenAnimation') ? true : false;
    return test; 
  }
*/

}
