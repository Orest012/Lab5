// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/components/login/login.component';
import { HttpClientModule } from '@angular/common/http'; // Імпортуємо HttpClientModule
import { provideHttpClient } from '@angular/common/http'; // Забезпечуємо HTTP клієнт

bootstrapApplication(LoginComponent, {
  providers: [provideHttpClient()]  // Надаємо HttpClient
})
  .catch(err => console.error(err));
