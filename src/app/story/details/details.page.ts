import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

import { StoryService, ToastService } from '../../_services';
import { Story, StoryType } from '../../_models';

import { AuthorBioPage, AddPledgePage, HelpActionPledgePage, HelpAvocadometerPage } from '../../_modals';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  story: Story = new Story;

  //Fake data
  pledgeCount: number;
  avocados: number;
  userAvocados: number;

  constructor(
    private route: ActivatedRoute, 
    private _story: StoryService, 
    private _toast: ToastService,
    private sanitizer: DomSanitizer,
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
        },
        () => {
          this.pledgeCount = this.story.pledgeCount;
          this.avocados = this.story.avocados;
          this.userAvocados = 0;
        }
      )
    });
  }

  onAddYourPledge () {
    this.pledgeCount += 1;
    
    this.showAddPledgeModal ();
    
    let addYourPledge = document.getElementById('add-your-pledge');
    addYourPledge.classList.add("hidden");

    let youHavePledged = document.getElementById('you-have-pledged');
    youHavePledged.classList.remove("hidden"); 
  }

  onAddAvocados (e) {
    if (e < this.userAvocados) {
      this.avocados -= this.userAvocados - e;
    } else if (e > this.userAvocados) {
      this.avocados += e - this.userAvocados;
    }
    this.userAvocados = e;
//    console.log(e);
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

  async loadAuthorBio(storyId: string) {
    console.log('id:', storyId);
    const modal = await this.modalController.create({
      component: AuthorBioPage,
      componentProps: {
        'storyId': storyId
      }
    });
    return await modal.present();
  }

  async showAddPledgeModal() {
    const modal = await this.modalController.create({
      component: AddPledgePage
    });
    return await modal.present();
  }

  async showHelpActionPledgeModal() {
    const modal = await this.modalController.create({
      component: HelpActionPledgePage
    });
    return await modal.present();
  }
  async showHelpAvocadometerModal() {
    const modal = await this.modalController.create({
      component: HelpAvocadometerPage
    });
    return await modal.present();
  }


}
