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
  private mockDataUrl = `${environment.mockDataUrl}/assets/mock-data` ;

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
    return this.http.get(`${this.mockDataUrl}/stories.json?v=0007`);
  }

  getAll() {
    return this.http.get(`${this.mockDataUrl}/stories.json?v=0007`);
  }

}
