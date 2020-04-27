import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Story, StoryType } from 'src/app/models';
import { Extender } from 'src/app/helpers';

@Injectable({
  providedIn: 'root'
})
export class StoriesService extends Extender {
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

  getById(id: string) {
    return this.http.get(`${environment.apiUrl}/story/${id}`);
  }

  getBySlug(slug: string) {
    return this.http.get(`${this._apiBaseURL}/stories.json`);
  }

  getAll() {
    return this.http.get(`${this._apiBaseURL}/stories.json`);
  }

}
