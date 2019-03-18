import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [

      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/home/home.module#HomePageModule'
          }
        ]
      },

       
      {
        path: 'data',
        children: [
          {path: '', loadChildren: '../pages/data/data.module#DataPageModule' },
          {path: 'add', loadChildren: '../pages/data-add/data-add.module#DataAddPageModule' },
          {path: 'edit/:id', loadChildren: '../pages/data-edit/data-edit.module#DataEditPageModule' },
  
         ]
      },

      {
        path: 'scan',
        children: [
          {path: '', loadChildren: '../pages/scan/scan.module#ScanPageModule' },
        ]
      },

      {
        path: 'http',
        children: [
          {path: '', loadChildren: '../pages/http/http.module#HttpPageModule'},
        ]
      },

      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: '../pages/map/map.module#MapPageModule'
          }
        ]
      },

      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class TabsPageRoutingModule {}
