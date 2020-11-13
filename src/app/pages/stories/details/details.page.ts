import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AlertController, ModalController} from '@ionic/angular';
import {SeoSocialShareData, SeoSocialShareService} from 'ngx-seo';
import {ModalPageComponent} from '../../../components/modal-page/modal-page.component';
import {Story} from '../../../models/story';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    story: Story;
    userAvocados: number;
    currentUrl;
    player;
    playerVideoUrl: SafeResourceUrl = null;
    options = {};
    constructor(
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private modalController: ModalController,
        private router: Router,
        private seoSocialShareService: SeoSocialShareService,
        public alertController: AlertController,
    ) {}

    ngOnInit() {
        this.currentUrl = 'https://TheNewCorporation.app' + this.router.url;
        console.log('this.currentUrl: ', this.currentUrl);
        this.story = new Story();

        this.story = this.route.snapshot.data.storyDetail;

        console.log('this.story.actions: ', this.story.actions);

        const image = 'https://cdn-thumbnails.sproutvideo.com/' + this.story.id + '/' + this.story.imageId + '/w_630,h_354,btn_true/poster.jpg';
        const seoData: SeoSocialShareData = {
            title: this.story.title,
            description: this.story.summary,
            image
        };
        this.seoSocialShareService.setTwitterCard('summary_large_image');
        this.seoSocialShareService.setAuthor('@TheCorpApp');
        this.seoSocialShareService.setTwitterSiteCreator('@TheCorpApp');
        this.seoSocialShareService.setData(seoData);
        // this.loadSlugDataPromise();
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
        const {data} = await modal.onWillDismiss();
        console.log('data ', data);
        if (data && data.action && data.action === 'reply') {
            this.player.play();
        }
    }

    loadSlugDataPromise() {
        // @ts-ignore
        this.player = new SV.Player({videoId: this.story.videoId});
        this.player.bind('completed', () => {
            console.log('Completed');
            this.presentModal();
        });
        this.player.bind('play', () => {
            console.log('play');
        });
    }

    videoEvents() {
        setTimeout(() => {
            // @ts-ignore
            this.player = new SV.Player({videoId: this.story.videoId});
            this.player.bind('completed', () => {
                this.presentModal();
            });
            this.player.bind('play', () => {
            });
        }, 10000);
    }


    sanatizeVideoUrl(videoCode: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://videos.sproutvideo.com/embed/' + videoCode + '?noBigPlay=false&showcontrols=false&allowfullscreen=true');
    }

    prepareVideoUrl(videoCode: string) {
        return 'https://videos.sproutvideo.com/embed/' + videoCode + '?noBigPlay=false&showcontrols=true&allowfullscreen=true';
    }

    sanatizeVideoResponsiveStyles(aspectRation: string) {
        return this.sanitizer.bypassSecurityTrustStyle('padding:' + aspectRation + '% 0 0 0;position:relative;');
    }

    sanatizeHTML(html: string) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }


     /**
     * This function is not in use. We can remove this in next commit.

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
                        this.meta.addTag({name: 'description', content: story.summary});
                        this.meta.addTag({name: 'keywords', content: story.share.keywords});
                        this.meta.addTag({name: 'image', content: story.share.image});
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
    */


}
