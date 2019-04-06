import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserAccountPage } from './user-account.page';
import { UserService } from '../../_services';
import { ComponentsModule } from '../../_components/components.module';

const routes: Routes = [
  {
    path: '',
    component: UserAccountPage
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
  declarations: [UserAccountPage],
  providers: [
    UserService
  ]
})
export class UserAccountPageModule {}
