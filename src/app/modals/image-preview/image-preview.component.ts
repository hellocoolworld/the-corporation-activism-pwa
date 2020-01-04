import { Component, Injector, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavParams } from '@ionic/angular';
import { Extender } from 'src/shared/helpers/extender';
import { FirestoreService } from 'src/shared/services/firestore/firestore.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent extends Extender implements OnInit {
  public image: string;

  constructor(
    protected injector: Injector,
    private navParams: NavParams,
    private socialShare: SocialSharing,
    private firestoreService: FirestoreService
  ) {
    super(injector);
  }

  /** get image from navParams */
  public ngOnInit() {
    this.image = this.navParams.get('data');
  }

  /** save an image to device album */
  public save(image: string) {
    this.socialShare.saveToPhotoAlbum(image).then(() => this.toast(this.translate.instant('other.save-to-album')));
  }

  /** save share image via various media */
  public share(image: string) {
    this.socialShare.share(null, null, null, image);
  }

  // public async delete() {
  //   await this.firestoreService.deleteUpload(this.image);
  //   this.closeModal();
  // }
}
