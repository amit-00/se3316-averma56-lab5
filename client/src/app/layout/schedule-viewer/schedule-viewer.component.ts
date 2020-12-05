import { Component, OnDestroy, OnInit } from '@angular/core';
import { Schedule } from '../../models/Schedule.model';
import { SchedulesService } from '../../schedules/schedules.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.css']
})
export class ScheduleViewerComponent implements OnInit, OnDestroy {
  schedules: Schedule[] = [];
  private scheduleSub: Subscription;
  pageSlice: Schedule[];
  isLoading:boolean = false;

  constructor(public schedulesService: SchedulesService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.schedulesService.getSchedules();
    this.scheduleSub = this.schedulesService.userScheduleUpdateListener()
      .subscribe((schedules:Schedule[]) => {
        this.isLoading = false;
        this.schedules = schedules;
        this.pageSlice = this.schedules.slice(0,5);

      });
  }
  ngOnDestroy(): void {
    this.scheduleSub.unsubscribe();
  }

}
