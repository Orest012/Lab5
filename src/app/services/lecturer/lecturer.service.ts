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

  // Додати тему
  addTopic(topic: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddTopic`, topic);
  }

  // Отримати теми
  getTopics(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetTopics/${courseId}`);
  }

  // Додати лабораторну роботу
  addLabAssignment(labAssignment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddLabAssignment`, labAssignment);
  }

  // Отримати лабораторні роботи
  getLabAssignments(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetLabAssignments/${courseId}`);
  }

  // Додати глосарій
  addGlossary(glossary: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddGlossary`, glossary);
  }

  // Отримати глосарії
  getGlossaries(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetGlossaries/${courseId}`);
  }
}
