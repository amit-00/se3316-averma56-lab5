import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/Course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  title:string = '';
  @Input() course:Course;


  constructor() { }

  ngOnInit(): void {
    this.title = `${this.course.subject} ${this.course.catalog_nbr} - ${this.course.className}`
  }

  //Dynamic Classes
  setComponent(){
    let classes= {
      LEC: this.course.course_info[0].ssr_component === 'LEC',
      TUT: this.course.course_info[0].ssr_component === 'TUT',
      LAB: this.course.course_info[0].ssr_component === 'LAB'
    }

    return classes;
  }

}
