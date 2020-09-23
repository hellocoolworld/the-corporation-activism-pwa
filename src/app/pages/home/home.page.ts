import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription, timer } from 'rxjs';
import { Extender } from '../../helpers/extender';
import { Story } from '../../models/story';
import { ScreenService } from '../../services/screen.service';
import { SettingsService } from '../../services/settings.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
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
        this.title.setTitle('The New Corporation - Welcome');
        this.screenService.isDesktopView().subscribe(isDesktop => {
            this.isDesktop = isDesktop;
        });
        this.setTimer();
    }

    public setTimer() {
        this.timer = timer(16000); // 5000 millisecond means 5 seconds
        this.subscription = this.timer.subscribe(() => {
            console.log('time out');
            this.skipIntro();
        });
    }

    public skipIntro() {
        this.settingsService.saveSetting('seenAnimation', true);
        this.seenAnimation = true;
    }

    public ngOnDestroy() {
        if (this.subscription && this.subscription instanceof Subscription) {
            console.log('destroy');
            this.subscription.unsubscribe();
        }
    }
}
