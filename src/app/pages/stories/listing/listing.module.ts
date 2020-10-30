import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingPageRoutingModule } from './listing-routing.module';

import { ListingPage } from './listing.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ListingPage]
})
export class ListingPageModule {}
