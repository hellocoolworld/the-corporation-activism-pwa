import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DataAddPage } from './data-add.page';

const routes: Routes = [
  {
    path: '',
    component: DataAddPage
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
  declarations: [DataAddPage]
})
export class DataAddPageModule {}
