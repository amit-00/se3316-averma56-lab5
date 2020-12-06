import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/Course.model'
import { SchedulesService } from '../schedules.service';

@Component({
  selector: 'app-course-view-item',
  templateUrl: './course-view-item.component.html',
  styleUrls: ['./course-view-item.component.css']
})
export class CourseViewItemComponent implements OnInit {
  @Input() course:Course;
  title:string;
  @Input() scheduleId:string;

  constructor(private schedulesService:SchedulesService) { }

  ngOnInit(): void {
    this.title = `${this.course.subject} ${this.course.catalog_nbr} - ${this.course.className}`
  }

  deleteFromSchedule() {
    if(!this.scheduleId && !this.course){
      return;
    }
    this.schedulesService.deleteCourse(this.scheduleId, this.course._id);
  }

}
