import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MoviesComponent],
  exports: [MoviesComponent]
})
export class MoviesModule { }
