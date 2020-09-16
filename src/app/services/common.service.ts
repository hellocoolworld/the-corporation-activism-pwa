import { HttpClient } from '@angular/common/http';
import {  Inject, Injectable, Injector } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';
import { SettingsService } from './settings.service';
import { Extender } from 'src/app/helpers/extender';
import { SocialShareModal } from 'src/app/modals/social-share/social-share.modal';


@Injectable({
  providedIn: 'root'
})
export class CommonService extends Extender {
  public countries: any[] = [];

  constructor(
    protected injector: Injector,
    @Inject(HttpClient) protected http: HttpClient,
    private settings: SettingsService
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



  /** checks if the device supports native and uses native share function
   * otherwise using open social share component
   */
  public async share(message: string, subject?: string, file?: string | string[], url?: string) {
      const modal = await this.openModal(SocialShareModal, url, 'custom-modal');
      modal.present();
  }


  public openSocialProvider(provider: number) {
    console.log('openSocialProvider');
    const link = this.settings.socialProviders.find(p => p.provider === provider).link;
    console.log('link: ', link);
    window.open(link, '_blank');
  }
}
