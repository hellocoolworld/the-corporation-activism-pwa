import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

import { TaleService, ToastService } from '../../../services';
import { Tale, TaleType } from '../../../models';

import { AuthorBioPage, AddPledgePage, HelpActionPledgePage, HelpAvocadometerPage } from '../../../modals';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  tale: Tale = new Tale;

  //Fake data
  pledgeCount: number;
  avocados: number;
  userAvocados: number;

  constructor(
    private route: ActivatedRoute, 
    private taleService: TaleService, 
    private toast: ToastService,
    private sanitizer: DomSanitizer,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.taleService.getBySlug(slug).subscribe(
        res => {
          let data = res as Tale[]; //Convert the result to an array of Tales
          for (var i=0; i<data.length; i++) {
            if (data[i].slug === slug){
              this.tale = data[i];
              break;
            }
          }
        },
        err => { 
          this.toast.error(err, true);
        },
        () => {
          this.pledgeCount = this.tale.pledgeCount;
          this.avocados = this.tale.avocados;
          this.userAvocados = 0;
        }
      )
    });
  }
  
  /**
   * @todo use ngClass and a getter 
   */
  onAddYourPledge () {
    this.pledgeCount += 1;
    this.showAddPledgeModal();
    let addYourPledge = document.getElementById('add-your-pledge');
    addYourPledge.classList.add("hidden");
    let youHavePledged = document.getElementById('you-have-pledged');
    youHavePledged.classList.remove("hidden"); 
  }

  /**
   * @todo checkout the event emitter 
   * @param rating {number}
   */
  onAddAvocados (rating: number) {
    if (rating < this.userAvocados) {
      this.avocados -= this.userAvocados - rating;
    } else if (rating > this.userAvocados) {
      this.avocados += rating - this.userAvocados;
    }
    this.userAvocados = rating;
  }

  sanatizeVideoUrl (videoCode: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + videoCode);
  }

  sanatizeVideoResponsiveStyles (aspectRation: string) {
    return this.sanitizer.bypassSecurityTrustStyle('padding:' + aspectRation + '% 0 0 0;position:relative;');
  }
  
  sanatizeHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  async loadAuthorBio(taleId: string) {
    console.log('id:', taleId);
    const modal = await this.modalController.create({
      component: AuthorBioPage,
      componentProps: {
        'taleId': taleId
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
