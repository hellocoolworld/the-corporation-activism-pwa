import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './_components/components.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';



@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule
  ],

  declarations: [
    AppComponent
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],

  exports: [],

  entryComponents: [],

  bootstrap: [AppComponent]
})

export class AppModule { }
