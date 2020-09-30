import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { SafePipe } from './safe.pipe';
import { ComponentsModule } from 'src/app/components/components.module';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    ComponentsModule,
    ShareButtonsModule
  ],
  declarations: [DetailsPage, SafePipe]
})
export class DetailsPageModule {}
