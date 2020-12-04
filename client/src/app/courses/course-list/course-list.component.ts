import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Course } from '../../models/Course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses:Course[];
  pageSlice: Course[];
  private courseSub: Subscription;
  constructor(public coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getCourses();
    this.courseSub = this.coursesService.courseUpdateListener()
      .subscribe((courses:Course[]) => {
        this.courses = courses;
      this.pageSlice = this.courses.slice(0,5);
      });
  }

  ngOnDestroy(): void {
    this.courseSub.unsubscribe();
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.courses.length){
      endIndex = this.courses.length;
    }
    this.pageSlice = this.courses.slice(startIndex, endIndex);
  }

}
