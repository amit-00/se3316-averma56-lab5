import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CourseItemComponent } from './courses/course-item/course-item.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseSearchComponent } from './courses/course-search/course-search.component';
import { ScheduleSelectorComponent } from './schedules/schedule-selector/schedule-selector.component';
import { CourseViewerComponent } from './layout/course-viewer/course-viewer.component';
import { ScheduleMakerComponent } from './schedules/schedule-maker/schedule-maker.component';
import { ScheduleViewerComponent } from './layout/schedule-viewer/schedule-viewer.component';
import { ScheduleItemComponent } from './schedules/schedule-item/schedule-item.component';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { PublicSchedulesComponent } from './layout/public-schedules/public-schedules.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { SingleCourseComponent } from './layout/single-course/single-course.component';
import { ReviewItemComponent } from './courses/review-item/review-item.component';
import { ReviewListComponent } from './courses/review-list/review-list.component';
import { ScheduleBuilderComponent } from './layout/schedule-builder/schedule-builder.component';
import { ScheduleCourseViewComponent } from './schedules/schedule-course-view/schedule-course-view.component';
import { CourseViewItemComponent } from './schedules/course-view-item/course-view-item.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { DocListComponent } from './docs/doc-list/doc-list.component';
import { DocItemComponent } from './docs/doc-item/doc-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseItemComponent,
    CourseListComponent,
    CourseSearchComponent,
    ScheduleSelectorComponent,
    CourseViewerComponent,
    ScheduleMakerComponent,
    ScheduleViewerComponent,
    ScheduleItemComponent,
    ScheduleListComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PublicSchedulesComponent,
    SingleCourseComponent,
    ReviewItemComponent,
    ReviewListComponent,
    ScheduleBuilderComponent,
    ScheduleCourseViewComponent,
    CourseViewItemComponent,
    UserItemComponent,
    UserListComponent,
    AdminDashboardComponent,
    DocListComponent,
    DocItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }