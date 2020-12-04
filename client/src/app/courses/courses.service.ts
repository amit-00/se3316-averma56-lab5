import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/Course.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses:Course[] = [];
  private coursesUpdated = new Subject<Course[]>();

  constructor(private http: HttpClient) { }

  getCourses() {
    this.http.get<Course[]>('http://localhost:5000/api/courses')
      .subscribe((courses) => {
        this.courses = courses;
        this.coursesUpdated.next([...this.courses]);
      });
  }

  searchCourses(code:String, subject:String, component:String, key:String) {
    if (code === null){
      code = ''
    }
    if (subject === null){
      subject = ''
    }
    if (component === null){
      component = ''
    }
    if (key === null){
      key = ''
    }
    this.http.get<Course[]>(`http://localhost:5000/api/courses/search?code=${code}&subject=${subject}&component=${component}&key=${key}`)
    .subscribe((courses) => {
      this.courses = courses;
      this.coursesUpdated.next([...this.courses]);
    });
  }

  courseUpdateListener() {
    return this.coursesUpdated.asObservable()
  }

}
