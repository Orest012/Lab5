import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://localhost:7195/api/admin'; // URL до AdminController

  constructor(private http: HttpClient) { }

  // Отримання повідомлення
  getAdminMessage(): Observable<string> {
    return this.http.get(`${this.baseUrl}`, { responseType: 'text' });
  }

  // Виконання запиту Print
  printUser(id: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
