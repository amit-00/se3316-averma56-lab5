import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Schedule } from 'src/app/models/Schedule.model';
import { Course } from '../../models/Course.model';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {
  @Input() schedule:Schedule;
  pageSlice: Course[];

  constructor() { }

  ngOnInit(): void {
    this.pageSlice = this.schedule.courses.slice(0,5);
  }

}
