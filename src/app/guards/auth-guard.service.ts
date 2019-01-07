import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate() {
    if (localStorage.getItem('hx_auth_token')) {
        return true;
    }

    this.router.navigate(['/login']);
    return false;
}
}
