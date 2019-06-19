import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

import { Tale } from '../../_models';
import { TaleService, ToastService } from 'src/app/_services';

@Component({
  selector: "app-author-bio",
  templateUrl: "./author-bio.page.html",
  styleUrls: ["./author-bio.page.scss"]
})
export class AuthorBioPage implements OnInit {
  
  tale: Tale = new Tale();

  constructor(
    private taleService: TaleService,
    private toast: ToastService,
    private sanitizer: DomSanitizer,
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    const taleId = this.navParams.data.taleId;
    /**
     * @todo create a slug as in getBySlug(this.navParams.data.taleSlug)
     */
    this.taleService.getById(taleId).subscribe(
      res => {
        const data = res as Tale[];
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === taleId) {
            this.tale = data[i];
            break;
          }
        }
      },
      err => {
        this._toast.error(err, true);
      }
    );
  }
  dismiss(): void {
    this.modalController.dismiss();
  }

  sanatizeHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
