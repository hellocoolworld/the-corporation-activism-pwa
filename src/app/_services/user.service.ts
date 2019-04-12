﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShellProvider } from '../_utils/shell-provider';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _profileDataWithShellCache: ShellProvider<User>;
    private _apiBaseURL: String = 'https://www.halotales.com/api';

    constructor(private http: HttpClient) { }

    getById(id: string) {
        return this.http.get(`${this._apiBaseURL}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this._apiBaseURL}/users/register`, user);
    }

    update(user: User) {
//        return this.http.put(`${this._apiBaseURL}/users/${user.id}`, user).pipe(
        return this.http.put(`${this._apiBaseURL}/users`, user).pipe(
            map(user => {
                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
        );
    }

    delete(id: number) {
        return this.http.delete(`${this._apiBaseURL}/users/${id}`);
    }
}