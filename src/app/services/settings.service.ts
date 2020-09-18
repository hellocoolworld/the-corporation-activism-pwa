import { Injectable, OnInit, Injector } from '@angular/core';
import { Extender } from 'src/app/helpers/extender';
import { Setting } from '../models';
import { Storage } from '@ionic/storage';

@Injectable({ providedIn: 'root' })
export class SettingsService extends Extender {

    get socialProviders() {
        return this.settings.socialProviders;
    }
    private settings: Setting;

    constructor(
        protected injector: Injector,
        private storage: Storage
    ) {
        super(injector);
        this.init();
    }

    private async init() {
        let s = await this.storage.get('settings');
        if (s) {
            s = JSON.parse(s);
        }
        this.settings = new Setting(s);
    }

    public getAllSettings() {
        return this.settings;
    }

    public getSetting(value) {
        if (this.settings && this.settings.hasOwnProperty(value)) {
            return this.settings[value];
        } else {
            return null;
        }
    }

    public saveSetting(setting: any, value: any) {
        // console.log('saveSetting: ', setting, value);

        if (this.settings && this.settings.hasOwnProperty(setting)) {
            // console.log('Found');
            this.settings[setting] = value;
            // console.log('this.settings[setting]: ', this.settings[setting]);
            try {
                if (this.settings) {
                    this.storage.set('settings', JSON.stringify(this.settings));
                }
            } catch (error) {
                console.log('error ', error);
            }
            // console.log('setting fresh: ', JSON.parse(localStorage.getItem('settings')));
            return true;
        } else {
            console.log('Not Found');
            return false;
        }
    }

    public getDeviceToken() {
        return this.settings.deviceToken;
    }

}
