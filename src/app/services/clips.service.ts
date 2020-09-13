import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Extender } from 'src/app/helpers';

@Injectable({
  providedIn: 'root'
})
export class ClipsService extends Extender {
  /**
   * @todo replace with env.ts consts
   */
  private _apiBaseURL: String = '/assets/mock-data';

  constructor(
    protected injector: Injector,
    private http: HttpClient
  ) {
    super(injector);
  }

  getBySlug(slug: string) {
    return this.http.get(`${this._apiBaseURL}/clips.json`);
  }

  getAll() {
    return this.http.get(`${this._apiBaseURL}/clips.json`);
  }

}
