import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Story, StoryType } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  // private _apiBaseURL: String = 'https://www.halotales.com/api';
  private _apiBaseURL: String = '/assets/mock-data';

  constructor(private http: HttpClient) {}

  getById(id: string) {
    // return this.http.get(`${this._apiBaseURL}/stories/${id}`);
    return this.http.get(`${this._apiBaseURL}/stories.json`)
  }

  getBySlug(slug: string) {
    // return this.http.get(`${this._apiBaseURL}/stories/${slug}`);
    return this.http.get(`${this._apiBaseURL}/stories.json`)
  }

  getAll() {
    // return this.http.get(`${this._apiBaseURL}/stories`);
    return this.http.get(`${this._apiBaseURL}/stories.json`);
  }

  create(story: Story) {
    return this.http.post(`${this._apiBaseURL}/stories`, story);
  }

  update(story: Story) {
    return this.http.put(`${this._apiBaseURL}/stories`, story);
  }

  delete(id: string) {
    return this.http.delete(`${this._apiBaseURL}/stories/${id}`);
  }
}
