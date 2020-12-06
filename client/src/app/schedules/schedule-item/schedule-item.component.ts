import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SchedulesService } from '../schedules.service';
import { Schedule } from '../../models/Schedule.model';
import { Course } from '../../models/Course.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit, OnDestroy {
  @Input() schedule:Schedule;
  @Input() public:boolean;
  pageSlice: Course[];
  private authStatusSub: Subscription;
  userIsAuth: boolean = false;

  constructor(public schedulesService:SchedulesService, private authService:AuthService) { }

  ngOnInit(): void {
    this.pageSlice = this.schedule.courses.slice(0,5);
    this.userIsAuth = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuth = isAuthenticated
      });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  deleteSchedule() {
    this.schedulesService.deleteSchedule(this.schedule._id);
  }

}
