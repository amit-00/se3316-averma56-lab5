import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {

  constructor(public coursesService: CoursesService) { }

  ngOnInit(): void {
  }

  searchCourses(form: NgForm) {
    const code = form.value.catalog_nbr;
    const sub = form.value.subject;
    const comp= form.value.ssr_component;
    const key = form.value.key;
    this.coursesService.searchCourses(code, sub, comp, key);
    form.resetForm();
  }

}
