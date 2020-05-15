        import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro.modal.html',
  styleUrls: ['./intro.modal.scss']
})

export class IntroModal {

  constructor(private modalController: ModalController) { }

  dismiss(): void {
    this.modalController.dismiss();
  }
}
