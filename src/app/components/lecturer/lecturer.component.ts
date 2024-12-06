import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Resource } from '../../models/Resource';
import { Topic } from '../../models/Topic';
import { LabAssignment } from '../../models/LabAssignment';
import { Glossary } from '../../models/Glossary';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LecturerComponent implements OnInit {
  resources: any[] = [];
  isFormVisible = false;
  resource = {
    name: '',
    description: '',
    link: '',
    topic: ''
  };

  // Forms data
  glossary = {
    name: '',
    description: ''
  };

  labAssignment = {
    title: '',
    description: '',
    deadline: ''
  };

  glossaries: any[] = [];
  labAssignments: any[] = [];
  assignments: any[] = [];
  courseId: number = 1;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getResources();
    this.getFiles();
    this.getAllAssignments();
  }

  // Метод для отримання всіх ресурсів
  getResources(): void {
    this.http.get<any[]>('https://localhost:7195/api/lecturer/GetAllResources').subscribe(
      (data) => {
        this.resources = data;
        this.groupResourcesByTopic();
      },
      (error) => {
        console.error('Error fetching resources:', error);
      }
    );
  }

  // Метод для групування ресурсів за темами
  groupResourcesByTopic(): void {
    const grouped = this.resources.reduce((acc, resource) => {
      const topic = resource.topic || 'Без теми';
      if (!acc[topic]) {
        acc[topic] = [];
      }
      acc[topic].push(resource);
      return acc;
    }, {});

    this.resources = Object.entries(grouped).map(([topic, resources]) => ({
      topic,
      resources
    }));
  }

  // Метод для додавання ресурсу
  addResource(): void {
    const newResource = {
      title: this.resource.name,
      link: this.resource.link,
      topic: this.resource.topic || 'Без теми',
      courseId: 1
    };

    this.http.post('https://localhost:7195/api/lecturer/AddResource', newResource).subscribe(
      () => {
        this.getResources();
        this.isFormVisible = false;
        this.resource = { name: '', description: '', link: '', topic: '' };
      },
      (error) => {
        console.error('Error adding resource:', error);
        console.log('Error details:', error.error);
      }
    );
  }


  toggleAddResourceForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  selectedFile: File | null = null;
  files: any[] = [];


  // Метод для обробки вибору файлу
  onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Метод для завантаження файлу на сервер
  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('https://localhost:7195/api/lecturer/UploadFile', formData)
        .subscribe(response => {
          // Оновлюємо список файлів після завантаження
          this.getFiles();
          this.selectedFile = null; // Скидаємо вибраний файл
        }, error => {
          console.error('Error uploading file:', error);
        });
    }
  }

  downloadFile(fileName: string): void {
    const encodedFileName = encodeURIComponent(fileName);
    const url = `https://localhost:7195/api/lecturer/DownloadFile/${encodedFileName}`;

    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }, error => {
      console.error('Error downloading file:', error);
    });
  }



  // Метод для отримання списку файлів
  getFiles(): void {
    this.http.get<any[]>('https://localhost:7195/api/lecturer/GetAllFiles')
      .subscribe(data => {
        this.files = data;
      }, error => {
        console.error('Error fetching files:', error);
      });
  }

  // Add Glossary
  addGlossary(): void {
    const glossaryData = {
      CourseId: this.courseId, // Course ID
      Term: this.glossary.name, // Назва терміну
      Definition: this.glossary.description // Опис терміну
    };

    this.http.post('https://localhost:7195/api/lecturer/AddGlossary', glossaryData).subscribe(
      (response) => {
        console.log('Glossary added:', response);
        this.getGlossaries();
        this.glossary = { name: '', description: '' };
      },
      (error) => {
        console.error('Error adding glossary:', error);
      }
    );
  }

  // Метод для отримання всіх завдань
  getAllAssignments(): void {
    this.http.get<any[]>('https://localhost:7195/api/lecturer/GetAllAssignment').subscribe(
      (data) => {
        this.assignments = data; // Збереження отриманих даних
      },
      (error) => {
        console.error('Error fetching assignments:', error);
      }
    );
  }

  // Get Glossaries
  getGlossaries(): void {
    this.http.get<any[]>(`https://localhost:7195/api/lecturer/GetGlossaries/${this.courseId}`).subscribe(
      (data) => {
        this.glossaries = data;
      },
      (error) => {
        console.error('Error fetching glossaries:', error);
      }
    );
  }

  // Add Lab Assignment
  addLabAssignment(): void {
    this.http.post('https://localhost:7195/api/lecturer/AddLabAssignment', {
      title: this.labAssignment.title,
      description: this.labAssignment.description,
      deadline: this.labAssignment.deadline,
      courseId: this.courseId
    }).subscribe(
      (response) => {
        console.log('Lab assignment added:', response);
        this.getLabAssignments();
        this.labAssignment = { title: '', description: '', deadline: '' };
      },
      (error) => {
        console.error('Error adding lab assignment:', error);
      }
    );
  }

  // Get Lab Assignments
  getLabAssignments(): void {
    this.http.get<any[]>(`https://localhost:7195/api/lecturer/GetLabAssignments/${this.courseId}`).subscribe(
      (data) => {
        this.labAssignments = data;
      },
      (error) => {
        console.error('Error fetching lab assignments:', error);
      }
    );
  }



}
