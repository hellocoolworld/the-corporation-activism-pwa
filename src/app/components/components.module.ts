import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesListingComponent } from './stories-listing/stories-listing.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { AddAvocadosComponent } from './add-avocados/add-avocados.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeIntroComponent } from './home-intro/home-intro.component';
import { HomeStaticComponent } from './home-static/home-static.component';



@NgModule({
  declarations: [
    StoriesListingComponent,
    HeaderComponent,
    FooterComponent,
    ModalPageComponent,
    AddAvocadosComponent,
    SideBarComponent,
    HomeIntroComponent,
    HomeStaticComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ShareModule,
    ShareButtonsModule,
    ShareIconsModule,
  ],
  exports: [
    StoriesListingComponent,
    HeaderComponent,
    FooterComponent,
    ModalPageComponent,
    AddAvocadosComponent,
    SideBarComponent,
    HomeIntroComponent,
    HomeStaticComponent,
  ]
})
export class ComponentsModule { }
