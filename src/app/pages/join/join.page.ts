import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../services/storage.service';
import { IFrameComponent, iframeResizer } from 'iframe-resizer';

@Component({
    selector: 'app-join',
    templateUrl: './join.page.html',
    styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {
    isBrowser;
    token: string;
    //url = `${environment.iframeUrl}/?tenant=TheNewCorporation&property=DotApp&campaign=bhushankumar&type=Join`;
    url = 'https://forms.coolworld.cloud/join?tenant=TheNewCorporation&property=DotApp&type=Join&campaign=Test';
    constructor(
        @Inject(DOCUMENT) private document,
        @Inject(PLATFORM_ID) platformId,
        private storageService: StorageService
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit() {
        iframeResizer({
            inPageLinks: true,
            checkOrigin: false,
            log: false,
            resizedCallback: (data) => {
                data.iframe.offsetParent.scrollTo(0, 0);
            }
        }, '#IFrame');

        const search: any = new URLSearchParams(this.document.location.search);
        this.token = search.get('token') ? search.get('token') : null;
        if (this.token) {
            this.url = `${environment.iframeUrl}?token=${this.token}`;
        }
        // console.log('Store');
        if (this.isBrowser) {
            // Listen to message from child window
            window.addEventListener('message', async (event: any) => {
                // console.log('parent received message!:  ', event.data);
                try {
                    const responseData = JSON.parse(event.data);
                    if (responseData && responseData.token) {
                        await this.storageService.set('token', responseData.token);
                    }
                } catch (error) {
                    // console.log('Error');
                }
            }, false);
        }
    }

}
