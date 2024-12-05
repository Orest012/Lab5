import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Імпортуємо HttpClient
import { FormsModule } from '@angular/forms';  // Імпортуємо FormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]  // Додаємо лише FormsModule до імпортів компонента
})
export class LoginComponent {
  loginModel = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  onLogin() {
    const loginData = {
      Username: this.loginModel.username,
      Password: this.loginModel.password
    };

    this.http.post('https://localhost:7195/api/account/login', loginData)
      .subscribe(
        (response: any) => {
          // Збережіть токен в localStorage або sessionStorage
          localStorage.setItem('token', response.token);
          console.log('Login successful', response);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
  }
}
