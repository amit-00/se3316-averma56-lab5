import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/Course.model';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses:Course[] = [];
  private coursesUpdated = new Subject<Course[]>();

  constructor(private http: HttpClient) { }

  getCourses(){
    this.http.get<Course[]>('http://localhost:5000/api/courses')
      .subscribe((courses) => {
        this.courses = courses;
        this.coursesUpdated.next([...this.courses]);
      });
    return [...this.courses];
  }

  courseUpdateListener() {
    return this.coursesUpdated.asObservable()
  }

}
