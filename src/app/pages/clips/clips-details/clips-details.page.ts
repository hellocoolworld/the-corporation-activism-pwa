import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Clip } from '../../../models/clip';
import { ClipsService } from '../../../services/clip.service';

@Component({
  selector: 'app-clips-details',
  templateUrl: './clips-details.page.html',
  styleUrls: ['./clips-details.page.scss'],
})
export class ClipsDetailsPage implements OnInit {
  clip: Clip = new Clip();
  clips: Array<Clip>;

  userAvocados: number;

  constructor(
    private route: ActivatedRoute,
    private clipsService: ClipsService,
    private title: Title,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.clipsService.getBySlug(slug).subscribe(
        res => {
          this.clips = res as Clip[];
          this.clips.some(clip => {
            console.log('slug:', clip.slug, slug);
            if (clip.slug === slug) {
              this.clip = clip;
              this.title.setTitle(`The New Corporation - ${this.clip.title}`);
              return true;
            } else {
              return false;
            }
          });
        },
        err => {
          console.error(err, true);
        }
      );
    });
  }
}
