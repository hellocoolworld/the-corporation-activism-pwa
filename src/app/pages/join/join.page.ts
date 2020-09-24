import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-join',
    templateUrl: './join.page.html',
    styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {
    token: string;
    url = `${environment.iframeUrl}/?tenant=TheNewCorporation&property=DotApp&campaign=bhushankumar&type=Join`;
    constructor(@Inject(DOCUMENT) private document) { }

    ngOnInit() {
        const search: any = new URLSearchParams(this.document.location.search);
        this.token = search.get('token') ? search.get('token') : null;
        if (this.token) {
            this.url = `${environment.iframeUrl}?token=${this.token}`;
        }
    }

}
