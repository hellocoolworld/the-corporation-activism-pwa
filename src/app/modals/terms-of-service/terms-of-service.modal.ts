import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-of-service-modal',
  templateUrl: './terms-of-service.modal.html',
  styleUrls: ['./terms-of-service.modal.scss']
})

export class TermsOfServiceModal {

  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }
}
