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
    this.title = `${this.course.catalog_nbr} ${this.course.subject} - ${this.course.className}`
  }

}
