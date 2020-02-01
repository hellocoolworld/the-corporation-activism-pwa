import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, NotAuthGuard } from 'src/app/guards';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'register', canActivate:[NotAuthGuard], loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'login', canActivate:[NotAuthGuard], loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'user', canActivate:[AuthGuard], loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'verify-account', loadChildren: './pages/verify-account/verify-account.module#VerifyAccountPageModule' },
  { path: 'profile/:id', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' },
  { path: 'tale/:slug', loadChildren: './pages/tales/details/details.module#DetailsPageModule' },
  { path: 'tales', loadChildren: './pages/tales/listing/listing.module#ListingPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
