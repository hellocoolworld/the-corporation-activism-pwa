import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';

import { StoriesService, ToastService } from '../../../services';
import { Story, StoryType } from '../../../models';
import { SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';

import { AuthorBioModal, AddPledgeModal, HelpActionPledgeModal, HelpAvocadometerModal } from '../../../modals';
import { ModalPageComponent } from '../../../components/modal-page/modal-page.component';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    story: Story = new Story;

    userAvocados: number;
    currentUrl;
    options = {};
    constructor(
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private storiesService: StoriesService,
        private toast: ToastService,
        private sanitizer: DomSanitizer,
        private modalController: ModalController,
        private router: Router,
        private seoSocialShareService: SeoSocialShareService,
        public alertController: AlertController
    ) { }

    async ngOnInit() {
        this.currentUrl = this.router.url;
        const slug = this.route.snapshot.paramMap.get('slug');
        this.loadSlugDataPromise(slug);
        setTimeout(async () => {
            this.presentModal();
        }, 2000);
    }

    async presentModal() {
        const modal = await this.modalController.create({
            cssClass: 'story-detail-modal',
            component: ModalPageComponent,
            componentProps: {
                'story': this.story
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        console.log('data ', data);
        if (data && data.action && data.action === 'reply') {
            /**
             * Reply Video Code will be here.
             */
        }
    }

    async loadSlugDataPromise(slug) {
        const res = await this.storiesService.getBySlug(slug).toPromise();
        const data: Array<Story> = res as Story[]; // Convert the result to an array of Story
        data.some(story => {
            if (story.slug === slug) {
                const seoData: SeoSocialShareData = {
                    title: story.share.title,
                    description: story.share.description,
                    image: story.share.image,
                    imageAuxData: {
                        height: story.share.height
                    },
                    keywords: story.share.keywords,
                };
                this.story = story;
                this.seoSocialShareService.setTwitterCard('summary_large_image');
                this.seoSocialShareService.setAuthor('@TheCorpApp');
                this.seoSocialShareService.setTwitterSiteCreator('@TheCorpApp');
                this.seoSocialShareService.setData(seoData);
                this.title.setTitle(`-- The New Corporation - ${this.story.title}`);

                // Possible Solution 1
                this.meta.addTag({ name: 'description', content: story.share.description });
                this.meta.addTag({ name: 'keywords', content: story.share.keywords });
                this.meta.addTag({ name: 'image', content: story.share.image });
                return true;
            } else {
                return false;
            }
        });
    }

    loadSlugData(slug) {
        this.storiesService.getBySlug(slug).subscribe(
            res => {
                const data: Array<Story> = res as Story[]; // Convert the result to an array of Story
                data.some(story => {
                    if (story.slug === slug) {
                        const seoData: SeoSocialShareData = {
                            title: story.share.title,
                            description: story.share.description,
                            image: story.share.image,
                            imageAuxData: {
                                height: story.share.height
                            },
                            keywords: story.share.keywords,
                        };
                        this.story = story;
                        this.seoSocialShareService.setTwitterCard('summary_large_image');
                        this.seoSocialShareService.setAuthor('@TheCorpApp');
                        this.seoSocialShareService.setTwitterSiteCreator('@TheCorpApp');
                        this.seoSocialShareService.setData(seoData);
                        this.title.setTitle(`-- The New Corporation - ${this.story.title}`);

                        // Possible Solution 1
                        this.meta.addTag({ name: 'description', content: story.share.description });
                        this.meta.addTag({ name: 'keywords', content: story.share.keywords });
                        this.meta.addTag({ name: 'image', content: story.share.image });
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
                this.userAvocados = 0;
            }
        );
    }

    /**
     * @todo use ngClass and a getter
     */
    onAddYourPledge() {
        this.story.pledgeCount += 1;
        this.showAddPledgeModal();
        const addYourPledge = document.getElementById('add-your-pledge');
        addYourPledge.classList.add('hidden');
        const youHavePledged = document.getElementById('you-have-pledged');
        youHavePledged.classList.remove('hidden');
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
            this.story.avocadoCount -= this.userAvocados - rating;
        } else if (rating > this.userAvocados) {
            this.story.avocadoCount += rating - this.userAvocados;
        }
        this.userAvocados = rating;
    }

    sanatizeVideoUrl(videoCode: string) {
        //https://videos.sproutvideo.com/embed/069cd6ba1411e0c18f/4df936265739e4ab
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://videos.sproutvideo.com/embed/' + videoCode);
    }

    sanatizeVideoResponsiveStyles(aspectRation: string) {
        return this.sanitizer.bypassSecurityTrustStyle('padding:' + aspectRation + '% 0 0 0;position:relative;');
    }

    sanatizeHTML(html: string) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    async loadAuthorBio(storyId: string) {
        console.log('id:', storyId);
        const modal = await this.modalController.create({
            component: AuthorBioModal,
            componentProps: {
                'storyId': storyId
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
