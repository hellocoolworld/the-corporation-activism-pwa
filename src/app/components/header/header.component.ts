import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Extender } from '../../helpers/extender';
import { Setting } from '../../models/setting';
import { ScreenService } from '../../services/screen.service';
import { SettingsService } from '../../services/settings.service';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends Extender implements OnInit, OnDestroy {
    isDesktop: boolean;
    showJoinButton = false;
    isBrowser = false;
    public settings: Setting;
    constructor(
        protected injector: Injector,
        @Inject(DOCUMENT) private document,
        private settingsService: SettingsService,
        private screenService: ScreenService,
        private menuController: MenuController,
        private storageService: StorageService,
        public routerService: Router,
        public changeDetectorRef: ChangeDetectorRef,
        @Inject(PLATFORM_ID) platformId,
    ) {
        super(injector);
        this.isBrowser = isPlatformBrowser(platformId);
        this.routerService.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                // console.log('val ', val);
                this.toggleShowJoinButton();
            }
        });
    }

    ngOnInit() {
        this.settings = this.settingsService.getAllSettings();
        this.screenService.isDesktopView().subscribe(isDesktop => {
            this.isDesktop = isDesktop;
            this.toggleShowJoinButton();
        });
        // this.toggleShowJoinButton();
    }

    get isHome() {
        // console.log('this.document.location.pathname ', this.document.location.pathname);
        let test = false;
        if (this.document.location.pathname === '/') {
            test = true;
        }
        // console.log('test: ', test);
        return test;
    }

    async toggleShowJoinButton() {
        if (this.isBrowser) {
            const token = await this.storageService.get('token');
            // console.log('this.document.location.pathname ', this.document.location.pathname);
            // console.log('token ', token);
            if (!token) {
                this.showJoinButton = true;
            } else if (token) {
                this.showJoinButton = false;
            }
            // console.log(' this.showJoinButton ', this.showJoinButton);
            this.changeDetectorRef.detectChanges();
        }
    }

    open(menuId: string) {
        // console.log('open: ', menuId);

        this.menuController.open(menuId);

    }

    goToUrl(url: any): void {
        this.document.location.href = url;
    }

    ngOnDestroy() {
        // console.log('bye');
    }
}
