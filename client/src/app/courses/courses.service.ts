import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Course } from '../models/Course.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses:Course[] = [];
  private coursesUpdated = new Subject<Course[]>();


  constructor(private http: HttpClient, private router:Router) { }

  getCourses() {
    this.http.get<Course[]>('http://localhost:5000/api/courses')
      .subscribe((courses) => {
        this.courses = courses;
        this.coursesUpdated.next([...this.courses]);
      });
  }

  getCourse(id:string) {
    return this.http.get<Course>(`http://localhost:5000/api/courses/${id}`);
  }

  searchCourses(code:string, subject:string, component:string, key:string) {
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
    this.http.get<Course[]>(`http://localhost:5000/api/courses/search/query?code=${code}&subject=${subject}&component=${component}&key=${key}`)
    .subscribe((courses) => {
      this.courses = courses;
      this.coursesUpdated.next([...this.courses]);
    });
  }

  addReview(comment:string, id:string) {
    this.http.put<Course>(`http://localhost:5000/api/courses/reviews/${id}`, { comment })
      .subscribe(course => {
        this.router.navigate([`/search`]);
      })
  }

  courseUpdateListener() {
    return this.coursesUpdated.asObservable();
  }
}
