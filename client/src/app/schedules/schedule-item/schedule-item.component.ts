import { Component, OnInit, Input } from '@angular/core';
import { SchedulesService } from '../schedules.service';
import { Schedule } from 'src/app/models/Schedule.model';
import { Course } from '../../models/Course.model';



@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {
  @Input() schedule:Schedule;
  @Input() public:boolean;
  pageSlice: Course[];

  constructor(public schedulesService:SchedulesService) { }

  ngOnInit(): void {
    this.pageSlice = this.schedule.courses.slice(0,5);
  }

  deleteSchedule() {
    this.schedulesService.deleteSchedule(this.schedule._id);
  }

}
