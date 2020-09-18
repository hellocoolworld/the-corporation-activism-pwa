import { Component, OnInit, Injector, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Platform, ModalController, MenuController } from '@ionic/angular';
import { Setting } from './models';
import { PrivacyPolicyModal, TermsOfServiceModal } from './modals';
import { SettingsService, ScreenService, CommonService } from './services';
import { Extender } from './helpers';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent extends Extender implements OnInit {
    isDesktop: boolean;
    deferredPrompt;
    isBrowser;
    public settings: Setting;
    constructor(
        protected injector: Injector,
        private platform: Platform,
        private menuController: MenuController,
        private modalController: ModalController,
        private screenService: ScreenService,
        private settingsService: SettingsService,
        private commonService: CommonService,
        @Inject(PLATFORM_ID) platformId,
    ) {
        super(injector);
        this.initializeApp();
        this.isBrowser = isPlatformBrowser(platformId);
    }

    async initializeApp() {
        this.platform.ready().then(() => {
            this.screenService.onResize(this.platform.width());
        });
    }
    addToHomeButton() {
        // Hide the app provided install promotion
        // hideMyInstallPromotion();
        // Show the install prompt
        this.deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        this.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    private onResize(event) {
        this.screenService.onResize(event.target.innerWidth);
    }

    ngOnInit() {
        if (this.isBrowser) {
            console.log('Inside this.isBrowser');
            // @ts-ignore
            window.addEventListener('beforeinstallprompt', (e) => {
                console.log('Inside beforeinstallprompt');
                // Prevent the mini-infobar from appearing on mobile
                e.preventDefault();
                // Stash the event so it can be triggered later.
                this.deferredPrompt = e;
                // Update UI notify the user they can install the PWA
                // showInstallPromotion();
            });
            // @ts-ignore
            window.addEventListener('appinstalled', (evt) => {
                // Log install to analytics
                console.log('INSTALL: Success');
            });
        }
        this.settings = this.settingsService.getAllSettings();
        this.screenService.isDesktopView().subscribe(isDesktop => {
            if (this.isDesktop && !isDesktop) {
                // Reload because our routing is out of place
                window.location.reload();
            }
            this.isDesktop = isDesktop;
        });
    }

    linkToSocialProfile(p: number) {
        this.commonService.openSocialProvider(p);
    }

    showJoin() {
        return this.settings.deviceToken;
    }

    close(): void {
        this.menuController.close();
    }

    async showTermsModal() {
        const modal = await this.modalController.create({
            component: TermsOfServiceModal
        });
        return await modal.present();
    }

    async showPrivacyModal() {
        const modal = await this.modalController.create({
            component: PrivacyPolicyModal
        });
        return await modal.present();
    }

    get copyrightYear() {
        return new Date().getFullYear();
    }


}
