import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AdminComponent {
  apiUrl = 'https://localhost:7195/api/admin'; // Ваш API URL
  newRole = ''; // Для додавання ролі
  username = ''; // Ім'я користувача для присвоєння ролі
  roleToAssign = ''; // Роль, яку потрібно присвоїти
  message = ''; // Повідомлення для користувача

  constructor(private http: HttpClient) { }

  addRole() {
    if (!this.newRole.trim()) {
      this.message = 'Role name cannot be empty.';
      return;
    }

    this.http.post(`${this.apiUrl}/add-role`, `"${this.newRole}"`, { headers: { 'Content-Type': 'application/json' } })
      .subscribe({
        next: (response: any) => {
          this.message = response.message;
          this.newRole = ''; // Очистити поле після успішного запиту
        },
        error: (error) => {
          this.message = error.error || 'Failed to add role.';
        }
      });
  }

  assignRole() {
    if (!this.username.trim() || !this.roleToAssign.trim()) {
      this.message = 'Username and role cannot be empty.';
      return;
    }

    const userRole = {
      Username: this.username,
      Role: this.roleToAssign
    };

    this.http.post(`${this.apiUrl}/assign-role`, userRole)
      .subscribe({
        next: (response: any) => {
          this.message = response.message;
          this.username = '';
          this.roleToAssign = '';
        },
        error: (error) => {
          this.message = error.error || 'Failed to assign role.';
        }
      });
  }
}
