import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { SocialAuthProvider } from '../../helpers/constants';
import { Extender } from '../../helpers/extender';
import { PrivacyPolicyModal, TermsOfServiceModal } from '../../modals';
import { Setting } from '../../models/setting';
import { CommonService } from '../../services/common.service';
import { ScreenService } from '../../services/screen.service';
import { SettingsService } from '../../services/settings.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent extends Extender implements OnInit, OnDestroy {
  public provider = SocialAuthProvider;
  public settings: Setting;
  public isDesktop: boolean;
  isShowJoinButton = false;
  constructor(
    protected injector: Injector,
    private settingsService: SettingsService,
    private menuController: MenuController,
    private modalController: ModalController,
    private screenService: ScreenService,
    private commonService: CommonService,
    private storageService: StorageService,
    private routerService: Router,
    public changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document) {
    super(injector);
    this.routerService.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
            // console.log('val ', val);
            this.showJoin();
        }
    });
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

  async showJoin() {
    const token = await this.storageService.get('token');
    if (!token) {
        this.isShowJoinButton = true;
    } else if (token) {
        this.isShowJoinButton = false;
    }
    if (this.document.location.pathname.indexOf('/join') !== -1) {
        // console.log('Inside if : This is join page');
        this.isShowJoinButton = false;
    }
    // console.log(' this.isShowJoinButton ', this.isShowJoinButton);
    this.changeDetectorRef.detectChanges();
    return this.isShowJoinButton;
  }

  join() {
    // console.log('join');
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
    // console.log('bye');
  }

}
