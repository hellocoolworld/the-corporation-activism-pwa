import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-avocadometer-page',
  templateUrl: './help-avocadometer.page.html',
  styleUrls: ['./help-avocadometer.page.scss'],
})

export class HelpAvocadometerPage {

  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }

}
