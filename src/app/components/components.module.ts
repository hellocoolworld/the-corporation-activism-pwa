import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddAvocadosComponent } from './add-avocados/add-avocados.component';
import { PopoverComponent } from './popover/popover.component';

import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';
import { TextShellComponent } from './text-shell/text-shell.component';
import { ImageShellComponent } from './image-shell/image-shell.component';

import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';

import { StoriesListingComponent } from './stories-listing/stories-listing.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeStaticComponent } from './home-static/home-static.component';
import { HomeIntroComponent } from './home-intro/home-intro.component';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ShareModule,
    ShareButtonsModule,
    ShareIconsModule
  ],
  declarations: [
    AspectRatioComponent,
    TextShellComponent,
    ImageShellComponent,
    AddAvocadosComponent,
    PopoverComponent,
    CheckboxWrapperComponent,
    CounterInputComponent,
    RatingInputComponent,
    StoriesListingComponent,
    HeaderComponent,
    HomeStaticComponent,
    HomeIntroComponent,
    FooterComponent,
    SideBarComponent,
    ModalPageComponent
  ],
  exports: [
    AspectRatioComponent,
    TextShellComponent,
    ImageShellComponent,
    AddAvocadosComponent,
    PopoverComponent,
    CheckboxWrapperComponent,
    CounterInputComponent,
    RatingInputComponent,
    StoriesListingComponent,
    HeaderComponent,
    HomeStaticComponent,
    HomeIntroComponent,
    FooterComponent,
    SideBarComponent,
    ModalPageComponent
  ],
  entryComponents: [PopoverComponent],
})
export class ComponentsModule {}
