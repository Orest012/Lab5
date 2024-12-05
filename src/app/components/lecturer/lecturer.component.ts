import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Resource } from '../../models/Resource';
import { Topic } from '../../models/Topic';
import { LabAssignment } from '../../models/LabAssignment';
import { Glossary } from '../../models/Glossary';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LecturerComponent {
  // Моделі для даних
  resource: Resource = { name: '', description: '' };
  topic: Topic = { title: '', courseId: 1 };
  labAssignment: LabAssignment = { assignmentName: '', courseId: 1 };
  glossary: Glossary = { term: '', definition: '' };

  // Для зберігання отриманих даних
  resources: Resource[] = [];
  topics: Topic[] = [];
  labAssignments: LabAssignment[] = [];
  glossaries: Glossary[] = [];

  constructor(private http: HttpClient) { }

  // Отримати повідомлення
  onGetMessage() {
    this.http.get('https://localhost:7195/api/lecturer', { responseType: 'text' })
      .subscribe(response => {
        console.log(response);
      });
  }

  // Додати ресурс
  onAddResource() {
    this.http.post('https://localhost:7195/api/lecturer/AddResource', this.resource)
      .subscribe(
        response => {
          console.log('Resource added:', response);
        },
        error => {
          console.error('Error adding resource:', error);
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
  }


  // Отримати ресурси
  onGetResources(courseId: number) {
    this.http.get<Resource[]>(`https://localhost:7195/api/lecturer/GetResources/${courseId}`)
      .subscribe((response: Resource[]) => {
        this.resources = response;
      });
  }

  // Додати тему
  onAddTopic() {
    this.http.post('https://localhost:7195/api/lecturer/AddTopic', this.topic)
      .subscribe(response => {
        console.log('Topic added:', response);
      });
  }

  // Отримати теми
  onGetTopics(courseId: number) {
    this.http.get<Topic[]>(`https://localhost:7195/api/lecturer/GetTopics/${courseId}`)
      .subscribe((response: Topic[]) => {
        this.topics = response;
      });
  }

  // Додати лабораторне завдання
  onAddLabAssignment() {
    this.http.post('https://localhost:7195/api/lecturer/AddLabAssignment', this.labAssignment)
      .subscribe(response => {
        console.log('Lab Assignment added:', response);
      });
  }

  // Отримати лабораторні завдання
  onGetLabAssignments(courseId: number) {
    this.http.get<LabAssignment[]>(`https://localhost:7195/api/lecturer/GetLabAssignments/${courseId}`)
      .subscribe((response: LabAssignment[]) => {
        this.labAssignments = response;
      });
  }

  // Додати глосарій
  onAddGlossary() {
    this.http.post('https://localhost:7195/api/lecturer/AddGlossary', this.glossary)
      .subscribe(response => {
        console.log('Glossary added:', response);
      });
  }

  // Отримати глосарії
  onGetGlossaries(courseId: number) {
    this.http.get<Glossary[]>(`https://localhost:7195/api/lecturer/GetGlossaries/${courseId}`)
      .subscribe((response: Glossary[]) => {
        this.glossaries = response;
      });
  }
}
