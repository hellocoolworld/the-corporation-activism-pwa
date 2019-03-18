import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { HttpService } from '../../services/http.service';

const { Geolocation } = Plugins;
const { Browser } = Plugins;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  heading: number;
  speed: number;

  public map: any;
  public location: any;
  public address: any;
  public nearby: any;

  constructor(
    private alertController: AlertController,
    private httpService: HttpService,
  ) {

  }

  ionViewWillEnter() {
    // call function here instead of ngOnInit so that the function 
    // get called everytime enter the page.
    this.getLocation()
  }

  ngOnInit() {

  }

  async getLocation() {
    const loc = await Geolocation.getCurrentPosition();
    this.latitude = loc.coords.latitude;
    this.longitude = loc.coords.longitude;
    this.accuracy = loc.coords.accuracy;
    this.altitude = loc.coords.altitude;
    this.getMapLocation(this.latitude, this.longitude)
  }

  async visitMap(lat, lng): Promise<any> {
    const url = 'http://maps.google.com/maps?geo:' + lat + ',' + lng;
    console.log(url)
    await Browser.open({ url: url });
  }

  getMapLocation(lat, lng) {
    // get data from Http Service Provider
    this.httpService.getMapLocation(lat, lng)
      .then(data => {
        this.map = data;
        this.location = this.map.plus_code;
        this.address = this.map.results;
      });
  }

}