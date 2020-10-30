import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-pledge-modal',
  templateUrl: './add-pledge.modal.html',
  styleUrls: ['./add-pledge.modal.scss'],
})
export class AddPledgeModal {

  constructor(private modalController: ModalController) { }

  share(): void {
  }

  dismiss(): void {
    this.modalController.dismiss();
  }

}
