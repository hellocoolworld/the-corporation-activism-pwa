import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { newsConfig } from '../credentials';
// get news credentials - src/app/credentials.ts

import { googleConfig } from '../credentials';
// get news credentials - src/app/credentials.ts

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // News Feed from https://newsapi.org
  // Please update your news credentials - src/app/credentials.ts
  public newsUrl = newsConfig.newsURL;
  public newsKey = newsConfig.apiKey;

  // Google Map
  // Please update your map credentials - src/app/credentials.ts
  public mapKey = googleConfig.apiKey;
  public mapUrl = googleConfig.mapURL;
  public nearby = googleConfig.nearbyURL;

  constructor(
    private http: HttpClient
  ) {

  }

  getNewsApi(country) {
    return new Promise(resolve => {
      const url = this.newsUrl + '?country=' + country + '&apiKey=' + this.newsKey;
      this.http.get(url).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getMapLocation(lat, lng) {
    return new Promise(resolve => {
      const url = this.mapUrl + '?latlng=' + lat + ',' + lng + '&key=' + this.mapKey;
      //console.log("URL : " + url)
      this.http.get(url).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
 
  getNearby(lat, lng) {
    return new Promise(resolve => {
      const url = this.nearby + '?location=' + lat + ',' + lng + '&radius=1500&type=food'  + '&key=' + this.mapKey;
      console.log("URL : " + url)
      this.http.get(url).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


}
