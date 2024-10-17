import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthReverseGuard implements CanActivate {
  
   constructor(private _authService: AuthService,
              private router: Router
  ){
  
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this._authService.isLogged()) {
      this.router.navigate(['/main']);
      return false;
    } 

    return true;
  }
}
