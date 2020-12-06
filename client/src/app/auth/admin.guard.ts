import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private authService:AuthService, private router:Router) {}


    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean | Observable<boolean> | Promise<boolean> {
        // const isAuth = this.authService.getIsAuth();
        // if(!isAuth) {
        //     this.router.navigate(['/login']);
        //     return false;
        // }
        const isAdmin = this.authService.getIsAdmin();
        if(!isAdmin) {
            this.router.navigate(['/']);
        }
        return isAdmin;
    }
}