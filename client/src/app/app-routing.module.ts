import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseViewerComponent } from './layout/course-viewer/course-viewer.component';
import { ScheduleMakerComponent } from './schedules/schedule-maker/schedule-maker.component';
import { ScheduleViewerComponent } from './layout/schedule-viewer/schedule-viewer.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';

const routes: Routes = [
  { path: 'search', component: CourseViewerComponent },
  { path: 'create', component: ScheduleMakerComponent },
  { path: 'edit/:scheduleId', component: ScheduleMakerComponent },
  { path: 'schedules', component: ScheduleViewerComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
