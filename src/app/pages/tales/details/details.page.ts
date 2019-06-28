import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

import { TaleService, ToastService } from '../../../services';
import { Tale, TaleType } from '../../../models';

import { AuthorBioModal, AddPledgeModal, HelpActionPledgeModal, HelpAvocadometerModal } from '../../../modals';

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
    private title: Title,
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
          let data: Array<Tale> = res as Tale[]; //Convert the result to an array of Tales
          data.some(tale => {
            console.log('slug:', tale.slug, slug);
            if (tale.slug === slug) {
              this.tale = tale;
              this.title.setTitle(`Halo Tales - ${this.tale.title}`);
              return true;
            } else {
              return false;
            }
          });
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
  onAddYourPledge() {
    this.pledgeCount += 1;
    this.showAddPledgeModal();
    let addYourPledge = document.getElementById('add-your-pledge');
    addYourPledge.classList.add("hidden");
    let youHavePledged = document.getElementById('you-have-pledged');
    youHavePledged.classList.remove("hidden");
  }
  sharePledge() {
    console.log('noop');
  }
  /**
   * @todo checkout the event emitter 
   * @param rating {number}
   */
  onAddAvocados(rating: number) {
    if (rating < this.userAvocados) {
      this.avocados -= this.userAvocados - rating;
    } else if (rating > this.userAvocados) {
      this.avocados += rating - this.userAvocados;
    }
    this.userAvocados = rating;
  }

  sanatizeVideoUrl(videoCode: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + videoCode);
  }

  sanatizeVideoResponsiveStyles(aspectRation: string) {
    return this.sanitizer.bypassSecurityTrustStyle('padding:' + aspectRation + '% 0 0 0;position:relative;');
  }

  sanatizeHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  async loadAuthorBio(taleId: string) {
    console.log('id:', taleId);
    const modal = await this.modalController.create({
      component: AuthorBioModal,
      componentProps: {
        'taleId': taleId
      }
    });
    return await modal.present();
  }

  async showAddPledgeModal() {
    const modal = await this.modalController.create({
      component: AddPledgeModal
    });
    return await modal.present();
  }

  async showHelpActionPledgeModal() {
    const modal = await this.modalController.create({
      component: HelpActionPledgeModal
    });
    return await modal.present();
  }
  async showHelpAvocadometerModal() {
    const modal = await this.modalController.create({
      component: HelpAvocadometerModal
    });
    return await modal.present();
  }


}
