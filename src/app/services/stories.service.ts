import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Story, StoryType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  /**
   * @todo replace with env.ts consts 
   */
  private _apiBaseURL: String = '/assets/mock-data';

  constructor(private http: HttpClient) { }

  getById(id: string) {
    return this.http.get(`${this._apiBaseURL}/story/${id}`);
  }

  getBySlug(slug: string) {
    return this.http.get(`${this._apiBaseURL}/stories.json`);
  }

  getAll() {
    return this.http.get(`${this._apiBaseURL}/stories.json`);
  }

}
