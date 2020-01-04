import { Component, Injector, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavParams } from '@ionic/angular';
import { Extender } from 'src/shared/helpers/extender';
import { isArray } from 'util';

@Component({
  selector: 'app-gallery-picker',
  templateUrl: './gallery-picker.component.html',
  styleUrls: ['./gallery-picker.component.scss']
})
export class GalleryPickerComponent extends Extender implements OnInit {
  public images: string[] = [];
  public mainImage: string;
  public textMsg: string = null;
  public selectedImageIndex: number = 0;

  constructor(protected injector: Injector, private navParams: NavParams, private socialShare: SocialSharing) {
    super(injector);
  }

  /** get images from nav param and set main image */
  public ngOnInit() {
    const data = this.navParams.get('data');
    this.images = isArray(data) ? data : [data];
    this.mainImage = this.images[this.selectedImageIndex];
  }

  /** send will set images and text and pass it as param in close modal so be accessed and used by message.component.ts */
  public async send(text: string, images: string[]) {
    const data = {
      images,
      text
    };

    this.closeModal(data);
  }

  /** save an image to device album */
  public save() {
    this.socialShare.saveToPhotoAlbum(this.mainImage).then(() => this.toast(this.translate.instant('other.save-to-album')));
  }

  /** save share image via various media */
  public share() {
    this.socialShare.share(null, null, null, this.mainImage);
  }

  /** remove image */
  public remove() {
    this.images.splice(this.selectedImageIndex, 1);
    this.mainImage = this.images[0];
  }
}
