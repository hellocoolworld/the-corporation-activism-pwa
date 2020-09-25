import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
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
    isShowJoinButton = false;
    public settings: Setting;
    constructor(
        protected injector: Injector,
        @Inject(DOCUMENT) private document,
        private settingsService: SettingsService,
        private screenService: ScreenService,
        private menuController: MenuController,
        private storageService: StorageService
    ) {
        super(injector);
    }


    ngOnInit() {
        this.settings = this.settingsService.getAllSettings();
        this.screenService.isDesktopView().subscribe(isDesktop => {
            this.isDesktop = isDesktop;
            this.showJoin();
        });
        this.showJoin();
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

    async showJoin() {
        if (this.settings) {
            this.isShowJoinButton = !this.settings.deviceToken;
        }
        if (this.document.location.pathname.indexOf('join') !== -1) {
            this.isShowJoinButton = false;
        }
        // get('token')
        console.log('Inside showJoin');
        const token = await this.storageService.get('token');
        console.log('token ', token);
        if (!token) {
            this.isShowJoinButton = true;
        } else {
            this.isShowJoinButton = false;
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
