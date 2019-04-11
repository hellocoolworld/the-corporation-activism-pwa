import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoriesPage } from './stories.page';
import { UserService } from '../_services';
import { StoriesResolver } from './stories.resolver';
import { ComponentsModule } from '../_components/components.module';

const routes: Routes = [
  {
    path: '',
    component: StoriesPage,
    resolve: {
      data: StoriesResolver
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
  declarations: [StoriesPage],
  providers: [
    StoriesResolver,
    UserService
  ]
})
export class StoriesPageModule {}
