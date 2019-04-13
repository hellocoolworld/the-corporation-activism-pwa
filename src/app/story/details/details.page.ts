import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

import { StoryService, ToastService } from '../../_services';
import { Story, StoryType } from '../../_models';

import { AddPledgePage } from '../../add-pledge/add-pledge.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  story: Story = new Story;

  constructor(
    private route: ActivatedRoute, 
    private _story: StoryService, 
    private _toast: ToastService,
    public sanitizer: DomSanitizer,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this._story.getBySlug(slug).subscribe(
        res => {
          let data = res as Story[]; //Convert the result to an array of Stories
          for (var i=0; i<data.length; i++) {
            if (data[i].slug === slug){
              this.story = data[i];
              break;
            }
          }
        },
        err => { 
          this._toast.error(err, true);
        }
      )
    });

  }

  sanatizeVideoUrl (videoCode: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + videoCode);
  }
  sanatizeVideoResponsiveStyles (aspectRation: string) {
    return this.sanitizer.bypassSecurityTrustStyle('padding:' + aspectRation + '% 0 0 0;position:relative;');
  }
  sanatizeHTML (html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  async showAddPledgeModal() {
    const modal = await this.modalController.create({
      component: AddPledgePage
    });
    return await modal.present();
  }

}
