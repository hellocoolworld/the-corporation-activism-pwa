import { Component, OnInit, Injector, HostListener } from '@angular/core';
import { Platform, ModalController, MenuController } from '@ionic/angular';
import { Setting } from './models';
import { PrivacyPolicyModal, TermsOfServiceModal } from './modals';
import { SettingsService, ScreenService, CommonService } from './services';
import { Extender } from './helpers';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent extends Extender implements OnInit {
  isDesktop: boolean;
  public settings: Setting;
  constructor(
    protected injector: Injector,
    private platform: Platform,
    private menuController: MenuController,
    private modalController: ModalController,
    private screenService: ScreenService,
    private settingsService: SettingsService,
    private commonService: CommonService) {
    super(injector);
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.screenService.onResize(this.platform.width());
    });
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screenService.onResize(event.target.innerWidth);
  }

  ngOnInit() {
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
    console.log('p: ', p);
    this.commonService.openSocialProvider(p);
  }

  join() {
    console.log('joIn');
    this.router.navigate(['join']);
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
