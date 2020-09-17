import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-modal-page',
    templateUrl: './modal-page.component.html',
    styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

    // enableBackdropDismiss = false;
    // showBackdrop = false;
    // shouldPropagate = false;
    currentUrl;
    constructor(
        private modalController: ModalController,
        private router: Router
    ) { }

    ngOnInit() {
        this.currentUrl = this.router.url;
    }

    dismiss() {
        this.modalController.dismiss();
    }

}
