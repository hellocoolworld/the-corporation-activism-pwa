import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Result } from '@zxing/library';
import { AlertController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  num: any;
  public resultDiv : boolean;

  constructor(
    public alertController: AlertController,
    public modalController: ModalController
  ) { }

  ngVersion = VERSION.full;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  ngOnInit(): void {

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
      
      if (this.availableDevices.length == 1) {
        this.num = 0;
        this.currentDevice = this.availableDevices[0];
      } else {
        this.num = 1;
        this.currentDevice = this.availableDevices[1];
      }

    });

    this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);

    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);

    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);

  }

  ionViewWillEnter() {
    // on scanner when enter page
    this.resultDiv = false
    this.scanner.restartScan();
  }

  ionViewWillLeave() {
    // off scanner when leaving page
    this.scanner.resetCodeReader();
  }


  reverse() {
    if (this.availableDevices.length > 1) {
      if (this.num == 0) {
        this.num = 1
      } else {
        this.num = 0
      }
    }
    this.currentDevice = this.availableDevices[this.num];
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    this.availableDevices = cameras;
  }

  scanResult(resultString: string) {
    // received scan result
    // display resultDiv
    this.resultDiv = true;
    this.scanner.resetCodeReader();
    this.qrResultString = resultString;
    console.log(this.qrResultString)
  }

  rescan(){
    // hide result div
    // restart scanner

    this.resultDiv = false;
    this.qrResultString = ''
    this.scanner.restartScan();
  }

  onDeviceSelectChange(selectedValue: string) {
    this.currentDevice = this.scanner.getDeviceById(selectedValue);
  }


  stateToEmoji(state: boolean): string {

    const states = {
      // not checked
      undefined: '❔',
      // failed to check
      null: '⭕',
      // success
      true: '✔',
      // can't touch that
      false: '❌'
    };

    return states['' + state];
  }
}
