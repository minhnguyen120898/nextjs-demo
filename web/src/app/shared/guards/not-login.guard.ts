import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { environment as config } from 'src/environments/environment';
import { UserRole } from '../enums/user-role';

// project import

@Injectable({
  providedIn: 'root'
})
export class NotLoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.getIsLoggedIn()) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
    return false;
  }
}
