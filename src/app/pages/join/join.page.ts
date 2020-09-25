import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'app-join',
    templateUrl: './join.page.html',
    styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {
    isBrowser;
    token: string;
    url = `${environment.iframeUrl}/?tenant=TheNewCorporation&property=DotApp&campaign=bhushankumar&type=Join`;
    constructor(
        @Inject(DOCUMENT) private document,
        @Inject(PLATFORM_ID) platformId,
        private storageService: StorageService
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit() {
        const search: any = new URLSearchParams(this.document.location.search);
        this.token = search.get('token') ? search.get('token') : null;
        if (this.token) {
            this.url = `${environment.iframeUrl}?token=${this.token}`;
        }
        // console.log('Store');
        if (this.isBrowser) {
            // Listen to message from child window
            window.addEventListener('message', (e) => {
                // console.log('parent received message!:  ', e.data);
                if (e.data.toString().includes(this.token)) {
                    this.storageService.set('token', e.data);
                }
                window.scrollTo(0, 0);
            }, false);
        }
    }

}
