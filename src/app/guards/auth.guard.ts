import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../components/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{

  constructor(private auth: AuthService, private router: Router){}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else 
    { 
      this.router.navigate(['login']);
      return false; 
    }
  }
}
