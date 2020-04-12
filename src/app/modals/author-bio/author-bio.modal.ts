import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

import { Story } from '../../models';
import { StoriesService, ToastService } from '../../services';

@Component({
  selector: "app-author-bio-modal",
  templateUrl: "./author-bio.modal.html",
  styleUrls: ["./author-bio.modal.scss"]
})
export class AuthorBioModal implements OnInit {
  
  story: Story = new Story();

  constructor(
    private storyService: StoriesService,
    private toast: ToastService,
    private sanitizer: DomSanitizer,
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    const storyId = this.navParams.data.storyId;
    /**
     * @todo create a slug as in getBySlug(this.navParams.data.storySlug)
     */
    this.storyService.getById(storyId).subscribe(
      res => {
        const data = res as Story[];
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === storyId) {
            this.story = data[i];
            break;
          }
        }
      },
      err => {
        this.toast.error(err, true);
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
