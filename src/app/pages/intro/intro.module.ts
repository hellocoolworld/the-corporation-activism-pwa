import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { IntroPage } from './intro.page';

const routes: Routes = [
  {
    path: '',
    component: IntroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntroPage]
})
export class IntroPageModule {}
