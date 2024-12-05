import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private baseUrl = 'https://localhost:7195/api/Lecturer'; // Замініть на ваш API URL

  constructor(private http: HttpClient) { }

  getResources(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetResources/${courseId}`);
  }

  addResource(resource: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddResource`, resource);
  }

  getTopics(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetTopics/${courseId}`);
  }

  addTopic(topic: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddTopic`, topic);
  }

  getLabAssignments(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetLabAssignments/${courseId}`);
  }

  addLabAssignment(labAssignment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddLabAssignment`, labAssignment);
  }
}
