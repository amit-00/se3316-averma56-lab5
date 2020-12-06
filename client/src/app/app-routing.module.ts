import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseViewerComponent } from './layout/course-viewer/course-viewer.component';
import { ScheduleMakerComponent } from './schedules/schedule-maker/schedule-maker.component';
import { ScheduleViewerComponent } from './layout/schedule-viewer/schedule-viewer.component';
import { PublicSchedulesComponent } from './layout/public-schedules/public-schedules.component'
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { SingleCourseComponent } from './layout/single-course/single-course.component';
import { ScheduleBuilderComponent } from './layout/schedule-builder/schedule-builder.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component'
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  { path: 'search', component: CourseViewerComponent },
  { path: 'create', component: ScheduleMakerComponent, canActivate: [AuthGuard] },
  { path: 'edit/:scheduleId', component: ScheduleMakerComponent, canActivate: [AuthGuard] },
  { path: 'course/:courseId', component: SingleCourseComponent, canActivate: [AuthGuard] },
  { path: 'builder/:scheduleId', component: ScheduleBuilderComponent, canActivate: [AuthGuard] },
  { path: 'schedules', component: ScheduleViewerComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'public', component: PublicSchedulesComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule { }
