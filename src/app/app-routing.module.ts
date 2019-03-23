import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'scan', loadChildren: './pages/scan/scan.module#ScanPageModule' },
  { path: 'http', loadChildren: './pages/http/http.module#HttpPageModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' },
  { path: 'camera', loadChildren: './pages/camera/camera.module#CameraPageModule' },
  { path: 'data', loadChildren: './pages/data/data.module#DataPageModule' },
  { path: 'success', loadChildren: './pages/success/success.module#SuccessPageModule' },
  { path: 'data-add', loadChildren: './pages/data-add/data-add.module#DataAddPageModule' },
  { path: 'data-edit', loadChildren: './pages/data-edit/data-edit.module#DataEditPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
