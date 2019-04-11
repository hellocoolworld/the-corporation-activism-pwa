import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfilePage } from './profile.page';
import { UserService } from '../_services';
import { UserProfileResolver } from './profile.resolver';
import { ComponentsModule } from '../_components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    resolve: {
      data: ProfileResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfilePage],
  providers: [
    UserProfileResolver,
    UserService
  ]
})
export class ProfilePageModule {}
