
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'join', loadChildren: './pages/join/join.module#JoinPageModule' },
  { path: 'stories', loadChildren: './pages/stories/listing/listing.module#ListingPageModule' },
  { path: 'story/:slug', loadChildren: './pages/stories/details/details.module#DetailsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
