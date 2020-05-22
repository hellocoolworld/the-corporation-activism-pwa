import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Extender } from 'src/app/helpers';
import { Story, Setting } from 'src/app/models';
import { SettingsService, ScreenService } from 'src/app/services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage extends Extender implements OnInit, OnDestroy {
  settings: Setting;
  stories: Story[] = [];
  isDesktop:boolean;
  
  constructor(
    protected injector: Injector,
    private title: Title,
    private settingsService: SettingsService,
    private screenService: ScreenService
      ) {
    super(injector);
  }

  ngOnInit() {
    this.settings = this.settingsService.getAllSettings();
    console.log('this.settings: ', this.settings);
    this.title.setTitle('The New Corporation - Welcome');
    this.screenService.isDesktopView().subscribe(isDesktop => {
      this.isDesktop = isDesktop;
    });
  }

  ngOnDestroy() {
  }

  join() {
    console.log('join: ');
    this.router.navigate(['/join']);
  }

  get isFirstPageThisSession(): boolean {
    return true;
    return this.settings.seenAnimation ? false : true;
  }


}
