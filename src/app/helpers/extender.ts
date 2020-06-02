import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Injector, Inject, Optional } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
// import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
// import { IRoutes, Routes } from './routes';

/**
 * @class Extender
 */
export class Extender {
  // implements OnDestroy {
  public status: string = '';
  public loading: boolean = false;

  constructor(@Optional() private _injector: Injector) { }



  /** get access to subscriptions in SubscriptionService, this makes it accessible to all components that extend this class */
  public get subscriptions(): Subscription[] {
    return this._injector.get(SubscriptionsService).subscriptions;
  }

  /** uncomment and add onDestroy implementation to unsubscribe from subscriptions in all components */
  /** unsubscribe to all subscriptions saved in SubscriptionsService */
  // public forceSubscriptionDestroy(): void {
  //   for (const sub of this.subscriptions) {
  //     sub.unsubscribe();
  //   }
  // }

  /** unsubscribe to all subscriptions saved in SubscriptionsService on component destroy */
  // public ngOnDestroy(): void {
  //   for (const sub of this.subscriptions) {
  //     sub.unsubscribe();
  //   }
  // }

  /** get access to routes and make them available app wide in any class that extends this class 
  public get routes(): IRoutes {
    return Routes._routes;
  }
*/

  /** inject angular Router class, saves us having to add this in several component constructors */
  public get router(): Router {
    return this._injector.get(Router);
  }

  /** navigate back */
  public back(): void {
    return this._injector.get(Location).back();
  }

  /** inject angular ActivatedRoute class, saves us having to add this in several component constructors*/
  public get activatedRoute(): ActivatedRoute {
    return this._injector.get(ActivatedRoute);
  }


  /** inject TranslateService class, saves us having to add this in several component constructors
  public get translate(): TranslateService {
    return this._injector.get(TranslateService);
  }
 */
  /** handles routing to pages allows to include route params */
  public goto(page: string, params: Params = null): Promise<any> {
    if (!params) {
      return this.router.navigate([page]);
    } else {
      return this.router.navigate([page], params);
    }
  }

  /** inject ionic ToastController class, saves us having to add this in several component constructors */
  public get toastCtrl(): ToastController {
    return this._injector.get(ToastController);
  }

  /**
   * methods with default toast settings and handling message input into toast for errors
   * error messages tend to have the format error.message
   * @param msg
   */
  public async toast(msg: any): Promise<any> {
    let val: any;
    val = typeof msg === 'string' ? msg : msg.message;
    const toast = await this.toastCtrl.create({
      message: val,
      duration: 2000
    });
    toast.present();
  }

  /** inject ionic ActionSheetController class, saves us having to add this in several component constructors */
  public get actionSheetCtrl(): ActionSheetController {
    return this._injector.get(ActionSheetController);
  }

  /** inject ionic AlertController class, saves us having to add this in several component constructors */
  public get alertCtrl(): AlertController {
    return this._injector.get(AlertController);
  }

  /** inject ionic ModalController class, saves us having to add this in several component constructors */
  public get modalCtrl(): ModalController {
    return this._injector.get(ModalController);
  }

  /** open modal for various components, add component properties and class */
  public async openModal(component: any, componentProps: any = {}, cssClass = '') {
    const modal = await this.modalCtrl.create({
      component,
      componentProps: { data: componentProps },
      cssClass
    });
    return modal;
  }

  /**
   * closes modal, can close with data and/or close and force a back navigation if you specify goBack to be true
   * @param data
   * @param goBack
   */
  public closeModal(data: any = null, route: any = false): void {
    this.modalCtrl.dismiss(data);
    if (route) {
      this.goto(route);
    }
  }

  /** convert timestamp from firebase to date */
  public toDate(item: number) {
    return new Date(item);
  }

  /** get random integer between two values */
  public getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
