import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { FooterAdComponent } from './footer-ad/footer-ad.component';
import { AddAvocadosComponent } from './add-avocados/add-avocados.component';
import { PopoverComponent } from './popover/popover.component';

import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';
import { TextShellComponent } from './text-shell/text-shell.component';
import { ImageShellComponent } from './image-shell/image-shell.component';

import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    AspectRatioComponent,
    TextShellComponent,
    ImageShellComponent,

    HeaderComponent,
    FooterAdComponent, 
    AddAvocadosComponent,
    PopoverComponent,
    
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent
  ],
  exports: [
    AspectRatioComponent,
    TextShellComponent,
    ImageShellComponent,

    HeaderComponent,
    FooterAdComponent, 
    AddAvocadosComponent,
    PopoverComponent,
    
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent
  ],
  entryComponents: [PopoverComponent],
})
export class ComponentsModule {}
