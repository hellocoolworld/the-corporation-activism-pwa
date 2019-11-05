import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiBaseURL: String = 'https://www.halotales.com/api';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(this.getUserOrNull());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public getUserOrNull(): any {
    let userData: any = JSON.parse(localStorage.getItem('currentUser'));
    if (!userData || !userData.dt || new Date() > userData.dt) {
      localStorage.removeItem('currentUser')
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
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.currentUserSubject.next(user);
    }
    return user;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
