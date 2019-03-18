import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanPage } from './scan.page';

const routes: Routes = [
  {
    path: '',
    component: ScanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ZXingScannerModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScanPage]
})
export class ScanPageModule {}
