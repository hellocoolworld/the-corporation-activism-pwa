import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiBaseURL: String = 'https://www.halotales.com/api';
    // private apiBaseURL: String = '/api';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.apiBaseURL}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.apiBaseURL}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.apiBaseURL}/users/register`, user);
    }

    update(user: User) {
//        return this.http.put(`${this.apiBaseURL}/users/${user.id}`, user).pipe(
        return this.http.put(`${this.apiBaseURL}/users`, user).pipe(
            map(user => {
                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
        );
    }

    delete(id: number) {
        return this.http.delete(`${this.apiBaseURL}/users/${id}`);
    }
}