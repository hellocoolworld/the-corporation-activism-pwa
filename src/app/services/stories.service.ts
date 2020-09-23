import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Extender } from '../helpers/extender';

@Injectable({
  providedIn: 'root'
})
export class StoriesService extends Extender {
  /**
   * @todo replace with env.ts consts
   */
  private apiBaseURL = 'http://localhost:4000/assets/mock-data';

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
    return this.http.get(`${this.apiBaseURL}/stories.json`);
  }

  getAll() {
    return this.http.get(`${this.apiBaseURL}/stories.json`);
  }

}
