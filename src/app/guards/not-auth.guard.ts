import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user: User = await this.authService.getUser();
        if (user) {
            return false;
        }
        return true;
    }
}
