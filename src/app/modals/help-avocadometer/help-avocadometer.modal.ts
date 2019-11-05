import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-avocadometer-modal',
  templateUrl: './help-avocadometer.modal.html',
  styleUrls: ['./help-avocadometer.modal.scss'],
})

export class HelpAvocadometerModal {

  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }

}
