// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'lecturer', component: LecturerComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
