import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    // private apiBaseURL: String = 'https://www.halotales.com/api';
    // private apiBaseURL: String = '../../assets/mock-data';
    private apiBaseURL: String = '/api';

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
        return this.http.put(`${this.apiBaseURL}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiBaseURL}/users/${id}`);
    }
}