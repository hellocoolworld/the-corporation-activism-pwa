import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Extender } from '../helpers/extender';

@Injectable({
  providedIn: 'root'
})
export class ClipsService extends Extender {
  /**
   * @todo replace with env.ts const
   */
  private mockDataUrl = '/assets/mock-data';

  constructor(
    protected injector: Injector,
    private http: HttpClient
  ) {
    super(injector);
  }

  getBySlug(slug: string) {
    return this.http.get(`${this.mockDataUrl}/clips.json`);
  }

  getAll() {
    return this.http.get(`${this.mockDataUrl}/clips.json`);
  }

}
