import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-action-pledge-page',
  templateUrl: './help-action-pledge.page.html',
  styleUrls: ['./help-action-pledge.page.scss'],
})

export class HelpActionPledgePage {

  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }

}
