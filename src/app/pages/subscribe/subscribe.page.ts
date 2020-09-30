import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {

  token: string;
  url;

  constructor(
    @Inject(DOCUMENT) private document,
  ) {}

  ngOnInit() {
    const search: any = new URLSearchParams(this.document.location.search);
    this.token = search.get('new_token') ? search.get('new_token') : null;
    if (this.token) {
      this.url = `${environment.iframeUrl}/settings?new_token=${this.token}`;
    }
  }

}
