import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage) { }

    get(key) {
        return this.storage.get(key);
    }

    set(key, value) {
        return this.storage.set(key, value);
    }

}
