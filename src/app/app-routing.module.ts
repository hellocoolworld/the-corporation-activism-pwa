import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'verify-account', loadChildren: './verify-account/verify-account.module#VerifyAccountPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  
    // otherwise redirect to home
    // { path: '**', redirectTo: '' }

  // { path: 'http', loadChildren: './pages/http/http.module#HttpPageModule' },
  // { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' },
  // { path: 'camera', loadChildren: './pages/camera/camera.module#CameraPageModule' },
  // { path: 'data', loadChildren: './pages/data/data.module#DataPageModule' },
  // { path: 'success', loadChildren: './pages/success/success.module#SuccessPageModule' },
  // { path: 'data-add', loadChildren: './pages/data-add/data-add.module#DataAddPageModule' },
  // { path: 'data-edit', loadChildren: './pages/data-edit/data-edit.module#DataEditPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
