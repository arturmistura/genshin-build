import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const item = (localStorage.getItem('socialUser') as any);

    if (item) {
      const socialUser = JSON.parse(item);

      if (socialUser && socialUser.email) {
        return true;
      }
    }

    this.router.navigate(['/']);

    return false;
  }
}
