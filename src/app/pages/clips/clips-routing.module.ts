import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClipsPage } from './clips.page';

const routes: Routes = [
  {
    path: '',
    component: ClipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClipsPageRoutingModule {}
