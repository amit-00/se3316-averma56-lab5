import { Component, OnDestroy, OnInit } from '@angular/core';
import { SchedulesService } from '../../schedules/schedules.service';
import { CoursesService } from '../../courses/courses.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Schedule } from '../../models/Schedule.model';
import { Course } from '../../models/Course.model';

@Component({
  selector: 'app-schedule-builder',
  templateUrl: './schedule-builder.component.html',
  styleUrls: ['./schedule-builder.component.css']
})
export class ScheduleBuilderComponent implements OnInit, OnDestroy {
  private scheduleSub: Subscription;
  private courseSub: Subscription;
  scheduleId:string;
  schedule:Schedule;
  courses:Course[] = [];
  isLoading: boolean = false;
  pageSlice: Course[];

  constructor(private schedulesService:SchedulesService, private coursesService: CoursesService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('scheduleId')){
        this.scheduleId = paramMap.get('scheduleId');
        this.isLoading = true;
        this.schedulesService.getCurrentSchedule(this.scheduleId);
        this.scheduleSub = this.schedulesService.currentScheduleUpdateListener()
          .subscribe((schedule:Schedule) => {
            this.schedule = schedule;
          })
        }
    });
    this.coursesService.getCourses();
    this.courseSub = this.coursesService.courseUpdateListener()
      .subscribe((courses:Course[]) => {
        this.isLoading = false;
        this.courses = courses;
        this.pageSlice = this.courses.slice(0,5);
      });
  }

  ngOnDestroy(): void{
    this.courseSub.unsubscribe();
    this.scheduleSub.unsubscribe();
  }

}
