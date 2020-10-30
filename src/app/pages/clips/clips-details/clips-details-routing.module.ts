import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClipsDetailsPage } from './clips-details.page';

const routes: Routes = [
  {
    path: '',
    component: ClipsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClipsDetailsPageRoutingModule {}
