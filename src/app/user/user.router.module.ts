import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: 'user',
    component: UserPage,
    children: [
      {
        path: 'account',
        loadChildren: './account/user-account.module#UserAccountPageModule'
      },
      // // {
      // //   path: 'settings',
      // //   loadChildren: './settings/settings.module#SettingsPageModule'
      // // },
      // // {
      // //   path: 'pledges',
      // //   loadChildren: './pledges/user-pledges.module#UserPledgesPageModule'
      // // },
      // {
      //   path: 'stories',
      //   children: [
      //     {
      //       path: 'stories',
      //       loadChildren: './stories/listing/listing.module#StriesListingPageModule'
      //     },
      //     {
      //       path: 'stories/:storyId',
      //       loadChildren: 'stories/details/story-details.module#StoryDetailsPageModule'
      //     }
      //   ]
      // },
    ]
  },
  {
    path: '',
    redirectTo: 'user/account',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [ ]
})
export class UserPageRoutingModule {}
