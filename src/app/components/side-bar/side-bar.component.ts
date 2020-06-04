import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { Extender, SocialAuthProvider } from 'src/app/helpers';
import { Setting } from 'src/app/models';
import { PrivacyPolicyModal, TermsOfServiceModal } from 'src/app/modals';
import { SettingsService, ScreenService, CommonService } from 'src/app/services';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent extends Extender implements OnInit, OnDestroy {
  public provider = SocialAuthProvider;
  public settings: Setting;
  public isDesktop: boolean;
  constructor(
    protected injector: Injector,
    private settingsService: SettingsService,
    private menuController: MenuController,
    private modalController: ModalController,
    private screenService: ScreenService,
    private commonService: CommonService) {
    super(injector);
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
    this.commonService.openSocialProvider(p);
  }

  showJoin() {
    return this.settings.deviceToken;
  }

  join() {
    console.log('join');
    this.router.navigate(['join']);
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
  
 

  ngOnDestroy() {
    console.log('bye');
  }

}
