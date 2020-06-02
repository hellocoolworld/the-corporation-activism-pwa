import { Injectable, OnInit, Injector } from '@angular/core';
import { Extender } from 'src/app/helpers/extender';
import { Setting } from '../models';

@Injectable({ providedIn: 'root' })
export class SettingsService extends Extender {

    get socialProviders() {
        return this.settings.socialProviders;
    }
    private settings: Setting;

    constructor(
        protected injector: Injector,
    ) {
        super(injector);
        this.init();
    }

    private init() {
        const s = JSON.parse(localStorage.getItem('settings'));
        this.settings = new Setting(s);
    }

    public getAllSettings() {
        return this.settings;
    }

    public getSetting(setting) {
        if (this.settings.hasOwnProperty(setting)) {
            return this.settings[name];
        } else {
            return null;
        }
    }

    public saveSetting(setting: any, value: any) {

        console.log('saveSetting: ', setting, value);

        if (this.settings.hasOwnProperty(setting)) {
            console.log('Found');
            this.settings[setting] = value;
            console.log('this.settings[setting]: ', this.settings[setting]);
            localStorage.setItem('settings', JSON.stringify(this.settings));
            console.log('setting fresh: ', JSON.parse(localStorage.getItem('settings')));
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
