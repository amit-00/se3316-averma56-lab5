import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../models/Schedule.model';

@Component({
  selector: 'app-schedule-course-view',
  templateUrl: './schedule-course-view.component.html',
  styleUrls: ['./schedule-course-view.component.css']
})
export class ScheduleCourseViewComponent implements OnInit {
  @Input() schedule:Schedule;

  constructor() { }

  ngOnInit(): void {
  }

}
