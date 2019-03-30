import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserAccountPage } from './user-account.page';
import { UserService } from '../user.service';
import { UserAccountResolver } from './user-account.resolver';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: UserAccountPage,
    resolve: {
      data: UserAccountResolver
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
  declarations: [UserAccountPage],
  providers: [
    UserAccountResolver,
    UserService
  ]
})
export class UserAccountPageModule {}
