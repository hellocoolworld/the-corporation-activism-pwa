import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tale, TaleType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaleService {
  /**
   * @todo replace with env.ts consts 
   */
  private _apiBaseURL: String = '/assets/mock-data';

  constructor(private http: HttpClient) { }

  getById(id: string) {
    return this.http.get(`${this._apiBaseURL}/tales.json`)
  }

  getBySlug(slug: string) {
    return this.http.get(`${this._apiBaseURL}/tales.json`)
  }

  getAll() {
    return this.http.get(`${this._apiBaseURL}/tales.json`);
  }

  create(tale: Tale) {
    return this.http.post(`${this._apiBaseURL}/tales`, tale);
  }

  update(tale: Tale) {
    return this.http.put(`${this._apiBaseURL}/tales`, tale);
  }

  delete(id: string) {
    return this.http.delete(`${this._apiBaseURL}/tales/${id}`);
  }
}
