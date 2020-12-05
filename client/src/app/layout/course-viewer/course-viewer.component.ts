import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../models/Course.model';
import { CoursesService } from '../../courses/courses.service';

@Component({
  selector: 'app-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.css']
})
export class CourseViewerComponent implements OnInit, OnDestroy {
  courses:Course[] = [];
  pageSlice: Course[];
  private courseSub: Subscription;
  isLoading: boolean = false;

  constructor(public coursesService: CoursesService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesService.getCourses();
    this.courseSub = this.coursesService.courseUpdateListener()
      .subscribe((courses:Course[]) => {
        this.isLoading = false;
        this.courses = courses;
        this.pageSlice = this.courses.slice(0,5);
      });
  }

  ngOnDestroy(): void {
    this.courseSub.unsubscribe();
  }

}
