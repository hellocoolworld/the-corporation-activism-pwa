import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tale, TaleType } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class TaleService {
  /**
   * @todo replace with env.ts consts 
   */
  private _apiBaseURL: String = 'http://localhost:1335/api';
  
  constructor(private http: HttpClient) {}

  getById(id: string) {
    return this.http.get(`${this._apiBaseURL}/tale/${id}`);
  }

  getBySlug(slug: string) {
    return this.http.get(`${this._apiBaseURL}/tale/${slug}`); // findOne will be overwriten to check if id or slug.
  }

  getAll() {
   return this.http.get(`${this._apiBaseURL}/tale`);
  }

  create(tale: Tale) {
    return this.http.post(`${this._apiBaseURL}/tale`, tale);
  }

  update(tale: Tale) {
    return this.http.put(`${this._apiBaseURL}/tale`, tale);
  }

  delete(id: string) {
    return this.http.delete(`${this._apiBaseURL}/tale/${id}`);
  }
}
