import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserPage } from './user.page';

const routes: Routes = [
  
 {
    path: '',
    component: UserPage,
    children: [
      {
        path: 'profile',
        loadChildren: '../user-profile/user-profile.module#UserProfilePageModule'
      },
      {
        path: 'settings',
        loadChildren: '../user-settings/user-settings.module#UserSettingsPageModule'
      },
      {
        path: '',
        redirectTo: '/user/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/user/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ UserPage ]
})
export class UserPageModule {}
