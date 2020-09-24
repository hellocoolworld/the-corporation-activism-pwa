import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Extender } from '../../helpers/extender';
import { Setting } from '../../models/setting';
import { ScreenService } from '../../services/screen.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends Extender implements OnInit, OnDestroy {

  isDesktop: boolean;
    public settings: Setting;
    constructor(
        protected injector: Injector,
        @Inject(DOCUMENT) private document,
        private settingsService: SettingsService,
        private screenService: ScreenService,
        private menuController: MenuController
    ) {
        super(injector);
    }


    ngOnInit() {
        this.settings = this.settingsService.getAllSettings();
        this.screenService.isDesktopView().subscribe(isDesktop => {
            this.isDesktop = isDesktop;
        });
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

    get showJoin() {
        let test = true;
        if (this.settings) {
            test = !this.settings.deviceToken;
        }
        if (this.document.location.pathname.indexOf('join') !== -1) {
            test = false;
        }
        return test;
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
