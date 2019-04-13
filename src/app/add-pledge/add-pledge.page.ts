import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-pledge',
  templateUrl: './add-pledge.page.html',
  styleUrls: ['./add-pledge.page.scss'],
})
export class AddPledgePage {

  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }

}
