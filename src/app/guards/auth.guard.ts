import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken['role'];
      if (role === 'Admin' || role === 'Lecturer') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
