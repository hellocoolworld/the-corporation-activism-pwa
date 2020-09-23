import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';

import { SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';

import { AuthorBioModal, AddPledgeModal, HelpActionPledgeModal, HelpAvocadometerModal } from '../../../modals';
import { ModalPageComponent } from '../../../components/modal-page/modal-page.component';
import { Story } from '../../../models/story';
import { StoriesService } from '../../../services/stories.service';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    story: Story = new Story();

    userAvocados: number;
    currentUrl;
    player;
    playerVideoUrl: SafeResourceUrl = null;
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
        public alertController: AlertController,
    ) { }

    ngOnInit() {
        this.currentUrl = this.router.url;
        this.story = this.route.snapshot.data.storyDetail;

        const seoData: SeoSocialShareData = {
            title: this.story.share.title,
            description: this.story.share.description,
            image: this.story.share.image,
            imageAuxData: {
                height: this.story.share.height
            },
            keywords: this.story.share.keywords,
        };

        this.seoSocialShareService.setTwitterCard('summary_large_image');
        this.seoSocialShareService.setAuthor('@TheCorpApp');
        this.seoSocialShareService.setTwitterSiteCreator('@TheCorpApp');
        this.seoSocialShareService.setData(seoData);

        this.loadSlugDataPromise();
    }

    async presentModal() {
        console.log('Inside');
        const modal = await this.modalController.create({
            cssClass: 'story-detail-modal',
            component: ModalPageComponent,
            componentProps: {
                story: this.story
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        console.log('data ', data);
        if (data && data.action && data.action === 'reply') {
            /**
             * Reply Video Code will be here.
             */
            console.log('Start the player again', this.player);
            // @ts-ignore
            this.player = new SV.Player({ videoId: this.story.videoId });
            this.player.play();
        }
    }

    loadSlugDataPromise() {
        setTimeout(() => {
            // @ts-ignore
            this.player = new SV.Player({ videoId: this.story.videoId });
            this.player.bind('completed', () => {
                console.log('Completed');
                this.presentModal();
            });
            this.player.bind('play', () => {
                console.log('play');
            });
        }, 2000);
    }

    videoEvents() {
        setTimeout(() => {
            // @ts-ignore
            this.player = new SV.Player({ videoId: this.story.videoId });
            this.player.bind('completed', () => {
                console.log('Completed');
                this.presentModal();
            });
            this.player.bind('play', () => {
                console.log('play');
            });
        }, 10000);
    }

    /**
     * This function is not in use. We can remove this in next commit.
     */
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
                        this.videoEvents();
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

    onAddAvocados(rating: number) {
        if (rating < this.userAvocados) {
            this.story.avocadoCount -= this.userAvocados - rating;
        } else if (rating > this.userAvocados) {
            this.story.avocadoCount += rating - this.userAvocados;
        }
        this.userAvocados = rating;
    }

    sanatizeVideoUrl(videoCode: string) {
        // https://videos.sproutvideo.com/embed/069cd6ba1411e0c18f/4df936265739e4ab
        const sanitizerUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://videos.sproutvideo.com/embed/' + videoCode + '?noBigPlay=false&showcontrols=true&allowfullscreen=true');
        // console.log('sanitizerUrl ', sanitizerUrl);
        return sanitizerUrl;
    }

    prepareVideoUrl(videoCode: string) {
        // https://videos.sproutvideo.com/embed/069cd6ba1411e0c18f/4df936265739e4ab
        return 'https://videos.sproutvideo.com/embed/' + videoCode + '?noBigPlay=false&showcontrols=true&allowfullscreen=true';
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
                storyId
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
