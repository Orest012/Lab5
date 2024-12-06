import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private baseUrl = 'https://localhost:7195/api/Lecturer'; // Замініть на свій URL

  constructor(private http: HttpClient) { }

  // Отримати повідомлення з контролера
  getLecturerMessage(): Observable<string> {
    return this.http.get(`${this.baseUrl}`, { responseType: 'text' });
  }

  // Додати ресурс
  addResource(resource: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddResource`, resource);
  }

  // Отримати ресурси
  getResources(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetResources/${courseId}`);
  }
}