import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { MetaModule } from '@ngx-meta/core';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import {
    AddPledgeModal,
    AuthorBioModal,
    HelpActionPledgeModal,
    HelpAvocadometerModal,
    PrivacyPolicyModal,
    SocialShareModal,
    TermsOfServiceModal
} from './modals';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@NgModule({
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
    entryComponents: [
        TermsOfServiceModal,
        PrivacyPolicyModal,
        AuthorBioModal,
        AddPledgeModal,
        HelpActionPledgeModal,
        HelpAvocadometerModal,
        SocialShareModal
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }), IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        ShareButtonsModule,
        ComponentsModule,
        MetaModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        IonicStorageModule.forRoot({
            driverOrder: ['localstorage']
        })
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Title,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
