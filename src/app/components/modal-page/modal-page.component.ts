import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Story } from '../../models';
import { MetaService } from '@ngx-meta/core';

@Component({
    selector: 'app-modal-page',
    templateUrl: './modal-page.component.html',
    styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

    currentUrl;
    @Input() story: Story;
    constructor(
        private modalController: ModalController,
        private router: Router,
        private readonly meta: MetaService
    ) { }

    ngOnInit() {
        this.currentUrl = this.router.url;
        console.log('currentUrl', this.currentUrl);
        console.log('currentUrl', this.story.share.description);
    }

    dismiss() {
        this.modalController.dismiss();
    }

    replyButton() {
        this.modalController.dismiss({
            action: 'reply'
        });
    }

}
