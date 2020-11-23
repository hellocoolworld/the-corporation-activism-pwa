import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';
import { SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';
import { ModalPageComponent } from '../../../components/modal-page/modal-page.component';
import { Story } from '../../../models/story';

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
    showVideo = true;
    share = {
        include: ['facebook', 'twitter', 'reddit', 'pinterest', 'email', 'sms'],
        size: 7,
        show: 7,
        showText: false
    };

    constructor(
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private modalController: ModalController,
        private router: Router,
        private seoSocialShareService: SeoSocialShareService,
        public alertController: AlertController,
    ) { }

    ngOnInit() {
        this.currentUrl = 'https://TheNewCorporation.app' + this.router.url;
        console.log('this.currentUrl: ', this.currentUrl);
        this.story = new Story();

        this.story = this.route.snapshot.data.storyDetail;
        console.log('this.story: ', this.story);

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
            this.player.play();
        }
    }

    postLoadVideo() {
        // @ts-ignore
        this.player = new SV.Player({ videoId: this.story.videoId });
        this.player.bind('completed', () => {
            console.log('Completed');
            this.showVideo = false;
        });
        this.player.bind('play', () => {
            console.log('Play');
        });
    }


    clickReplay() {
        console.log('clickReplay');
        this.showVideo = true;
        this.player.play();
    }

    clickHide() {
        console.log('clickHide');
        this.showVideo = true;
    }



    sanatizeVideoUrl(videoCode: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://videos.sproutvideo.com/embed/' + videoCode + '?noBigPlay=false&showcontrols=false&allowfullscreen=true');
    }

    sanatizeVideoResponsiveStyles(aspectRation: string) {
        return this.sanitizer.bypassSecurityTrustStyle('padding:' + aspectRation + '% 0 0 0;position:relative;');
    }

    prepareVideoUrl(videoCode: string) {
        return 'https://videos.sproutvideo.com/embed/' + videoCode + '?noBigPlay=false&showcontrols=true&allowfullscreen=true';
    }

    sanatizeHTML(html: string) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
