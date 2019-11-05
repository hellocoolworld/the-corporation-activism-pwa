import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy-modal',
  templateUrl: './privacy-policy.modal.html',
  styleUrls: ['./privacy-policy.modal.scss']
})

export class PrivacyPolicyModal {

  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }
}
