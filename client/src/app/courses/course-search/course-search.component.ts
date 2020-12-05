import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {
  form: FormGroup;
  constructor(public coursesService: CoursesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'key': new FormControl(''),
      'code': new FormControl(''),
      'sub': new FormControl(''),
      'comp': new FormControl('')
    })
  }

  searchCourses() {
    const code:string = this.form.value.code;
    const sub:string = this.form.value.sub;
    const comp:string = this.form.value.comp;
    const key:string = this.form.value.key;

    this.coursesService.searchCourses(code, sub, comp, key);
    this.form.reset();
  }

}
