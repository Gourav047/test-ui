import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate  {

  IS_LOGIN:boolean=false;

  constructor(private _accountService: AccountService, private _router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._accountService.isAuthenticated()) {
      return true; // User is authenticated, allow access
    } else {
      // User is not authenticated, redirect to login or desired page
      this._router.navigate(['/login']); // Navigate to login page
      return false;
    }
  }


}
