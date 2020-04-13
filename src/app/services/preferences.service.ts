import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Preference } from '../models';

@Injectable({ providedIn: 'root' })
export class PreferenceService {
    private _apiBaseURL: String = 'https://api.com/api';

    constructor(private injec) { }

    getById(id: string) {
        return this.http.get(`${this._apiBaseURL}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this._apiBaseURL}/users/register`, user);
    }

    update(user: User) {
//        return this.http.put(`${this._apiBaseURL}/users/${user.uid}`, user).pipe(
        return this.http.put(`${this._apiBaseURL}/users`, user).pipe(
            map(user => {
                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            })
        );
    }

    
}