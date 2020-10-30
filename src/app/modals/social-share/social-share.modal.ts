import { Component, Injector, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Extender } from 'src/app/helpers/extender';
import { ShareService } from 'ngx-sharebuttons';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.modal.html',
  styleUrls: ['./social-share.modal.scss']
})
export class SocialShareModal extends Extender implements OnInit {
  public socialButtons: Array<{ text: string; icon?: string; type: string; color?: string }>;

  constructor(protected injector: Injector, private navParam: NavParams, private share: ShareService) {
    super(injector);
  }

  /** get share configs */
  public ngOnInit() {
    this.share.config.url = `${environment.hosting}/${this.navParam.get('data')}`;
    this.socialButtons = [
      {
        text: 'Facebook',
        type: 'facebook'
      },
      {
        text: 'Twitter',
        type: 'twitter'
      },
      {
        text: 'WhatsApp',
        type: 'whatsapp',
        icon: 'message-circle'
      },
      {
        text: 'Email',
        type: 'email',
        color: 'dark',
        icon: 'mail'
      },
      {
        text: 'Copy',
        type: 'copy',
        color: 'medium'
      },
      {
        text: 'Print',
        type: 'print',
        color: 'tertiary',
        icon: 'printer'
      }
    ];
  }
}
