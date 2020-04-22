import { Injectable, OnInit, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Extender } from 'src/app/helpers/extender';
import { Setting } from '../models';
import { Setting } from '../models/setting';

@Injectable({ providedIn: 'root' })
export class SettingsService extends Extender implements OnInit {

    constructor(
        protected injector: Injector,
        private settings: Setting) {
        super(injector);
    }

    public ngOnInit() {
        this.settings = new Setting(JSON.parse(localStorage.getItem('settings')));
    }

    getSetting(name) {
        try {
            if (this.settings.hasOwnProperty(setting)) {
                return this.settings[name];
            }
        } catch (e) {
            return err(...); 
        }
    }

    saveSetting(setting: any, value: any) {
        if (this.settings.hasOwnProperty(setting)) {
            this.settings[setting] = value;
        }
        return localStorage.setItem('settings', JSON.stringify(this.settings));
    }

}