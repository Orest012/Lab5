// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Маршрут для логіну
    { path: 'lecturer', component: LecturerComponent }, // Маршрут для лектора
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Перенаправлення за замовчуванням
];