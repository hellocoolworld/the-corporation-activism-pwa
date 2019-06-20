import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TalesPage } from './tales.page';
import { UserService } from '../_services';
import { TalesResolver } from './tales.resolver';
import { ComponentsModule } from '../_components/components.module';

const routes: Routes = [
  {
    path: '',
    component: TalesPage,
    resolve: {
      data: TalesResolver
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
  declarations: [TalesPage],
  providers: [
    TalesResolver,
    UserService
  ]
})
export class TalesPageModule {}
