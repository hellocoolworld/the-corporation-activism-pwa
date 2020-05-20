import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';


// tslint:disable-next-line:max-line-length
import {  PrivacyPolicyModal,
          TermsOfServiceModal,
          AuthorBioModal,
          AddPledgeModal,
          HelpActionPledgeModal, 
          HelpAvocadometerModal,
          SocialShareModal
        } from './modals';


@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireMessagingModule,
    AngularFirestoreModule
  ],

  declarations: [
    AppComponent,
    TermsOfServiceModal,
    PrivacyPolicyModal,
    AuthorBioModal,
    AddPledgeModal,
    HelpActionPledgeModal,
    HelpAvocadometerModal,
    SocialShareModal
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    Title
  ],

  exports: [],

  entryComponents: [
    TermsOfServiceModal,
    PrivacyPolicyModal,
    AuthorBioModal,
    AddPledgeModal,
    HelpActionPledgeModal,
    HelpAvocadometerModal,
    SocialShareModal
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
