import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiBaseURL: String = 'https://www.halotales.com/api';
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(this.getUserOrNull());
    this.user = this.userSubject.asObservable();
  }

  public get user(): User {
    return this.userSubject.value;
  }

  public getUserOrNull(): any {
    let userData: any = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData.dt || new Date() > userData.dt) {
      localStorage.removeItem('user')
      return null;
    } else {
      return userData.user;
    } 
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiBaseURL}/users/authenticate`, { email, password }).pipe(
      map(user => {
        return this.storeUser(user);
      })
    );
  }


  verify(id: string, verificationCode: string) {
    return this.http.post<any>(`${this.apiBaseURL}/users/verify`, { id, verificationCode }).pipe(
      map(user => {
        return this.storeUser(user);
      })
    );
  }

  storeUser(user: User) {
    if (user && user.token) {
      let dt: Date = new Date();
      dt.setHours(dt.getHours() + 1);
      let userData: any = {
        user: user,
        dt: dt
      };
      localStorage.setItem('user', JSON.stringify(userData));
      this.userSubject.next(user);
    }
    return user;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

}
