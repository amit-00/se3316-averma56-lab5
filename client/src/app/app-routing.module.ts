import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseViewerComponent } from './layout/course-viewer/course-viewer.component';
import { ScheduleMakerComponent } from './schedules/schedule-maker/schedule-maker.component';
import { ScheduleViewerComponent } from './layout/schedule-viewer/schedule-viewer.component'

const routes: Routes = [
  { path: 'search', component: CourseViewerComponent },
  { path: 'create', component: ScheduleMakerComponent },
  { path: 'edit/:scheduleId', component: ScheduleMakerComponent },
  { path: 'schedules', component: ScheduleViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
