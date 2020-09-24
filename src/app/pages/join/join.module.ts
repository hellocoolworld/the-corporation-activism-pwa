import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinPageRoutingModule } from './join-routing.module';

import { JoinPage } from './join.page';
import { ComponentsModule } from '../../components/components.module';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinPageRoutingModule,
    ComponentsModule
  ],
  declarations: [JoinPage, SafePipe]
})
export class JoinPageModule {}
