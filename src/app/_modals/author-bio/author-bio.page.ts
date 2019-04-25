import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

import { Story } from '../../_models';
import { StoryService, ToastService } from 'src/app/_services';

@Component({
  selector: 'app-author-bio',
  templateUrl: './author-bio.page.html',
  styleUrls: ['./author-bio.page.scss']
})
export class AuthorBioPage implements OnInit {
  story: Story = new Story();

  constructor(
    private _story: StoryService,
    private _toast: ToastService,
    private sanitizer: DomSanitizer,
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    const storyId = this.navParams.data.storyId;
    this._story.getById(storyId).subscribe(
      res => {
        const data = res as Story[]; // Convert the result to an array of Stories
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === storyId) {
            this.story = data[i];
            break;
          }
        }
      },
      err => {
        this._toast.error(err, true);
      },
      // () => {
      //   console.log(this.story);
      // }
    );
  }
  dismiss(): void {
    this.modalController.dismiss();
  }

  sanatizeHTML (html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
