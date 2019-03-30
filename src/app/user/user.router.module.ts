import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children: [
      {
        path: 'account',
        loadChildren: 'account/account.module#AccountPageModule'
      },
      {
        path: 'settings',
        loadChildren: 'settings/settings.module#SettingsPageModule'
      },
      {
        path: 'pledges',
        loadChildren: './pledges/user-pledges.module#UserPledgesPageModule'
      },
      {
        path: 'stories',
        children: [
          {
            path: 'stories',
            loadChildren: 'stories/listing/listing.module#StriesListingPageModule'
          },
          {
            path: 'stories/:storyId',
            loadChildren: 'stories/details/story-details.module#StoryDetailsPageModule'
          }
        ]
      },
    ]
  },
  // /app/ redirect
  {
    path: 'user',
    redirectTo: 'user/user-account',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [ ]
})
export class UserPageRoutingModule {}
