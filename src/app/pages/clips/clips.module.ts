import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClipsPageRoutingModule } from './clips-routing.module';

import { ClipsPage } from './clips.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClipsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ClipsPage]
})
export class ClipsPageModule {}
