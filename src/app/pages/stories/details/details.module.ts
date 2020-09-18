import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../components/components.module';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { DetailsPage } from './details.page';
import { SafePipe } from '../../../pipes/safe.pipe';

const routes: Routes = [
    {
        path: '',
        component: DetailsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        RouterModule.forChild(routes),
        ShareModule,
        ShareButtonsModule,
        ShareIconsModule
    ],
    declarations: [DetailsPage,
        SafePipe
    ]
})
export class DetailsPageModule { }
