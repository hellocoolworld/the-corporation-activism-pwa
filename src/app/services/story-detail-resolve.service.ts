import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Story } from '../models/story';
import { StoriesService } from './stories.service';

@Injectable({
  providedIn: 'root'
})
export class StoryDetailResolveService implements Resolve<any> {

  story: Story = new Story();
  constructor(
    private storyService: StoriesService,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.paramMap.get('slug');
    return this.loadSlugDataPromise(slug);
  }

  async loadSlugDataPromise(slug: string) {
    const res = await this.storyService.getBySlug(slug).toPromise();
    const data: Array<Story> = res as Story[];
    return data.find(story => {
      if (story.slug === slug) {
        return story;
      }
    });
  }
}
