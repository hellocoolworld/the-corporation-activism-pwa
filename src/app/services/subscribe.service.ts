import {HttpClient} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import {environment} from '../../environments/environment';
import {Extender} from '../helpers/extender';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService extends Extender {

  constructor(
    protected injector: Injector,
    private http: HttpClient
  ) {
    super(injector);
  }

  getClaimDataByToken(token: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/list/token/?token=${token}`);
  }
}
