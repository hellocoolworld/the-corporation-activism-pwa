import { HttpClient } from '@angular/common/http';
import { ElementRef, Inject, Injectable, Injector } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';
import { AuthService } from 'src/pages/auth/services/auth/auth.service';
import { Extender } from 'src/shared/helpers/extender';
import { SocialShareComponent } from 'src/shared/modals/social-share/social-share.component';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends Extender {
  public cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  public countries: any[] = [];

  constructor(
    protected injector: Injector,
    @Inject(HttpClient) protected http: HttpClient,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private camera: Camera,
    private callNumber: CallNumber,
    private imagePicker: ImagePicker,
    private socialSharing: SocialSharing
  ) {
    super(injector);
  }

  /** get list of countries from free api */
  public getCountries(): Observable<any> {
    if (this.countries.length === 0) {
      return this.http.get<any[]>('https://restcountries.eu/rest/v2/all').pipe(
        map((res) => {
          this.countries = res;
          return res;
        })
      );
    } else {
      return of(this.countries);
    }
  }

  /** search country by name */
  public searchCountry(search): Observable<any> {
    return this.http.get<any[]>('https://restcountries.eu/rest/v2/name/' + search).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /** call user method checks if the device supports native and uses native call number function.
   * otherwise pass reference to <a href="tel:" and access click event to make a browser call
   */
  public async callUser(mobile: string, el: ElementRef) {
    if (mobile) {
      if ((window as any).cordova) {
        await this.callNumber.isCallSupported();
        return await this.callNumber.callNumber(mobile, false);
      } else {
        el.nativeElement.click();
      }
    } else {
      this.toast('User does not have a phone number');
    }
  }

  /** checks if the device supports native and uses native share function
   * otherwise using open social share component
   */
  public async share(message: string, subject?: string, file?: string | string[], url?: string) {
    if ((window as any).cordova) {
      return await this.socialSharing
        .share(message, subject, file, url)
        .then(() => this.toast(this.translate.instant('feed-component.share-confirm')));
    } else {
      const modal = await this.openModal(SocialShareComponent, url, 'custom-modal');
      modal.present();
    }
  }

  /** specify which native library to use to get images.
   * if multiple images, use imagePicker library, if camera, use camera library
   */
  public async getPictures(type: number, multiple = false): Promise<string | any> {
    if (!multiple) {
      return this.getPicturesNative(type);
    } else {
      return await this.getPicturesFromLibrary();
    }
  }

  /** get files from browser file input and convert to images and resolve all */
  public async getImagesFromFiles(event: any) {
    let reads = [];
    const images = Array.prototype.slice.call(event.target.files);
    if (images && images.length > 0) {
      reads = images.map((element) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = (e) => {
            resolve((e.target as any).result);
          };
          return reader.readAsDataURL(element);
        });
      });
      const _images = await Promise.all(reads);
      return _images;
    }
  }

  /** get single image from camera or library and append base64 string text and resolve */
  private async getPicturesNative(type: number) {
    this.cameraOptions.sourceType = type;
    this.cameraOptions.quality = 20;
    return await new Promise<string | any>((resolve, reject) => {
      this.camera
        .getPicture(this.cameraOptions)
        .then((results: string) => {
          resolve('data:image/jpeg;base64,' + results);
        })
        .catch((err) => reject(err));
    });
  }

  /** get images from library and append base64 string text and resolve */
  private async getPicturesFromLibrary(): Promise<string[] | any> {
    const options = {
      outputType: 1,
      quality: 20,
      maximumImagesCount: 5
    };
    return await new Promise<string[] | any>((resolve, reject) => {
      this.imagePicker
        .getPictures(options)
        .then((results) => {
          resolve(results.map((item: string) => 'data:image/jpeg;base64,' + item));
        })
        .catch((err) => {
          reject(err);
          this.toast('fail' + err);
        });
    });
  }
}
