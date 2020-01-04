import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/pages/auth/helpers/model';
import { AuthService } from 'src/pages/auth/services/auth/auth.service';
import { Extender } from 'src/shared/helpers/extender';
import { CommonService } from 'src/shared/services/common/common.service';
import { FirestoreService } from 'src/shared/services/firestore/firestore.service';
import { isArray } from 'util';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends Extender implements OnInit {
  public currentUser: IUser;
  public countrySelectOptions = {
    header: this.translate.instant('edit-profile-component.select-country'),
    data: this.commonService.getCountries()
  };
  @ViewChild('fileInputButton', null) private fileInputButton: ElementRef;

  constructor(
    protected injector: Injector,
    private authService: AuthService,
    private commonService: CommonService,
    private firestoreService: FirestoreService
  ) {
    super(injector);
  }

  /** get current user */
  public async ngOnInit() {
    this.currentUser = await this.authService.getUser();
  }

  /**
   * open actionsheet with options to select image from camera or library
   * once image is selected, save image to firebase cloud storage
   */
  public async changePhoto() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('edit-profile-component.change-profile-image'),
      buttons: [
        {
          text: this.translate.instant('other.camera'),
          handler: () => {
            this.getPicture(1);
          }
        },
        {
          text: this.translate.instant('other.library'),
          handler: () => {
            this.getPicture(0);
          }
        },
        {
          text: this.translate.instant('other.close'),
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  /** detect file from browser file input changes and upload image */
  public detectFiles(event: any) {
    let image: string;
    this.commonService.getImagesFromFiles(event).then((images) => {
      if (isArray(images)) {
        image = images[0];
      }
      this.uploadImage(image);
    });
  }

  /**
   * update currentUser and close modal, show toast if any error occurs
   */
  public save(close = true) {
    this.loading = true;
    this.firestoreService
      .upsert<IUser>(`users/${this.currentUser.uid}`, this.currentUser)
      .then(() => {
        this.loading = false;
        if (close) {
          this.closeModal(this.currentUser);
        }
      })
      .catch((err) => this.failPromise(err));
  }

  /**
   * get image using native camera plugin to retrieve from either camera or library of device
   * param type is a number that specifies whether to get from camera or from library
   * one image retrieved, upload to firebase storage. if error, display a toast with error message
   * @param type
   */
  private getPicture(type: number) {
    this.loading = true;
    if ((window as any).cordova) {
      // if on device use native plugins
      this.commonService
        .getPictures(type)
        .then((imageData) => {
          this.uploadImage(imageData);
        })
        .catch((err) => this.failPromise(err));
    } else {
      // if on device use browser file upload
      (this.fileInputButton.nativeElement as HTMLInputElement).click();
    }
  }

  /**
   * append base 64 string to image data, upload image data to firebase storage.
   * the upload function returns a download data which is then saved to currentUser.photoUrl property
   */
  private uploadImage(imageData: string) {
    this.currentUser.photoURL = imageData;
    this.firestoreService
      .uploadImage(this.currentUser.photoURL, this.currentUser.uid, 'profile-images')
      .then((photoURL) => {
        this.currentUser.photoURL = photoURL;
        this.save(false);
        this.loading = false;
      })
      .catch((err) => this.failPromise(err));
  }

  private failPromise = (err: any) => {
    this.loading = false;
    this.toast(err);
  };
}
