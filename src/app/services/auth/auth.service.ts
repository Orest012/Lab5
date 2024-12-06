import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7195/api/account/login'; // URL вашого API

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const loginData = { Username: username, Password: password };

    this.http.post<any>(this.apiUrl, loginData).subscribe({
      next: (response) => {
        const role = response.role; // Отримуємо роль із відповіді
        this.redirectBasedOnRole(role); // Перенаправляємо користувача
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

  redirectBasedOnRole(role: string) {
    if (role === 'Admin') {
      this.router.navigate(['/admin']); // Перенаправляємо на сторінку для адміністраторів
    } else if (role === 'Lecturer') {
      this.router.navigate(['/lecturer']); // Перенаправляємо на сторінку для лекторів
    } else {
      console.error('Unknown role'); // Якщо роль невідома
    }
  }
}
