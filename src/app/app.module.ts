import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirestoreSettingsToken } from '@angular/fire/firestore';

import { firebaseConfig } from './credentials';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  exports: [ZXingScannerComponent],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    FormsModule,
    ZXingScannerModule,
    IonicStorageModule.forRoot(),
  ],

  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,}
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
