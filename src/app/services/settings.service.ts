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
        if (this.settings.hasOwnProperty(setting)) {
            this.settings[setting] = value;
            localStorage.setItem('settings', JSON.stringify(this.settings));
            return true;
        } else {
            return false;
        }
    }

    public getDeviceToken() {
        return this.settings.deviceToken;
    }

}
