import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user: User = await this.authService.getUser();
        if (user) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    /*async ngOnInit() {
        const user: User = await this.authService.getUser();
        if (user) {
          // if user is loged in and not verified
          // redirect to verify-user page
          if (!user.isVerified) {
            this.router.navigate(['/verify-account']);
          } else {
            // redirect to home if already logged in and Verified
            this.router.navigate(['/']);
          }
        }*/
}
