import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(public toastCtrl: ToastController) { }

  success(message: string, closeBtn: boolean, duration = 2000) {
    this.create(message, 'success', closeBtn, duration);
  }

  warning(message: string, closeBtn: boolean, duration = 2000) {
    this.create(message, 'warning', closeBtn, duration);
  }

  error(message: string, closeBtn: boolean, duration = 2000) {
    this.create(message, 'danger', closeBtn, duration);
  }

  info(message: string, closeBtn: boolean, duration = 2000) {
    this.create(message, 'light', closeBtn, duration);
  }


  private async create(message: string, color: string, ok: boolean = false, duration: number) {
    const toast = await this.toastCtrl.create({
     message: message ,
     duration: ok ? null : duration,
     position: 'top',
     color: color,
     showCloseButton: true,
     closeButtonText: 'X'
    });
    toast.present();
  }

}
