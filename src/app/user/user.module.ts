import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserPageRoutingModule } from './user.router.module';

import { UserPage } from './user.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UserPageRoutingModule
  ],
  declarations: [ UserPage ]
})
export class UserPageModule {}
