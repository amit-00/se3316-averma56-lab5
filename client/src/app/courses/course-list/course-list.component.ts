import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Course } from '../../models/Course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @Input() courses:Course[] = [];
  @Input() pageSlice: Course[];
  @Input() isBuilder:boolean;
  @Input() scheduleId:string;

  constructor() { }

  ngOnInit(): void {  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.courses.length){
      endIndex = this.courses.length;
    }
    this.pageSlice = this.courses.slice(startIndex, endIndex);
  }

}
