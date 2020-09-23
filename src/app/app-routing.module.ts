import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StoryDetailResolveService } from './services/story-detail-resolve.service';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    },
    {
      path: 'about',
      loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
    },
    {
      path: 'join',
      loadChildren: () => import('./pages/join/join.module').then(m => m.JoinPageModule),
    },
    {
      path: 'clips',
      loadChildren: () => import('./pages/clips/clips.module').then( m => m.ClipsPageModule),
    },
    {
      path: 'clips/:slug',
      loadChildren: () => import('./pages/clips/clips-details/clips-details.module').then(m => m.ClipsDetailsPageModule),
    },
    {
      path: 'stories',
      loadChildren: () => import('./pages/stories/listing/listing.module').then( m => m.ListingPageModule),
    },
    {
      path: 'story/:slug',
      loadChildren: () => import('./pages/stories/details/details.module').then(m => m.DetailsPageModule),
      resolve: {
        storyDetail: StoryDetailResolveService
      }
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
    ],
    providers: [StoryDetailResolveService],
    exports: [RouterModule]
})
export class AppRoutingModule { }
