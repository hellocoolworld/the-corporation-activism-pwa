import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DataEditPage } from './data-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DataEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DataEditPage]
})
export class DataEditPageModule {}
