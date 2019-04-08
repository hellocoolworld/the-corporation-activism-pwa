import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../_components/components.module';

import { VerifyAccountPage } from './verify-account.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyAccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [VerifyAccountPage]
})
export class VerifyAccountPageModule {}
