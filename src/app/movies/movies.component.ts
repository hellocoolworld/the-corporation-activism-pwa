import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  title = 'films-synopsys';
  movies;

  constructor(private myService: MoviesService) {}

  ngOnInit() {
    this.myService.getMovies()
      .subscribe(res => this.movies = res);
  }
}
