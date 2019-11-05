import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-action-pledge-modal',
  templateUrl: './help-action-pledge.modal.html',
  styleUrls: ['./help-action-pledge.modal.scss'],
})

export class HelpActionPledgeModal {

  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }

}
