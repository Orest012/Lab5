// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';  // Імпортуємо HttpClient
// import { FormsModule } from '@angular/forms';  // Імпортуємо FormsModule
// import { Router } from '@angular/router';  // Імпортуємо Router

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   standalone: true,
//   imports: [FormsModule]  // Додаємо лише FormsModule до імпортів компонента
// })
// export class LoginComponent {
//   loginModel = {
//     username: '',
//     password: ''
//   };

//   constructor(private http: HttpClient, private router: Router) { }  // Додаємо Router до конструктора

//   onLogin() {
//     const loginData = {
//       Username: this.loginModel.username,
//       Password: this.loginModel.password
//     };

//     this.http.post('https://localhost:7195/api/account/login', loginData)
//       .subscribe(
//         (response: any) => {
//           // Збережіть токен в localStorage або sessionStorage
//           localStorage.setItem('token', response.token);
//           console.log('Login successful', response);

//           // Переходимо на сторінку лектора після успішного логіну
//           this.router.navigate(['/lecturer']);  // Перехід на сторінку лектора
//         },
//         (error) => {
//           console.error('Login failed', error);
//         }
//       );
//   }
// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Імпортуємо Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  loginModel = { username: '', password: '' };

  constructor(private http: HttpClient, private router: Router) { }

  onLogin() {
    const loginData = {
      Username: this.loginModel.username,
      Password: this.loginModel.password
    };

    this.http.post<any>('https://localhost:7195/api/account/login', loginData)
      .subscribe(
        (response: any) => {
          const role = response.role; // Отримуємо роль із відповіді сервера
          console.log('Login successful', response);

          this.redirectBasedOnRole(role); // Перенаправляємо на основі ролі
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
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
