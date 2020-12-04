import { Component, OnDestroy, OnInit } from '@angular/core';
import { Schedule } from '../../models/Schedule.model';
import { SchedulesService } from '../schedules.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-schedule-selector',
  templateUrl: './schedule-selector.component.html',
  styleUrls: ['./schedule-selector.component.css']
})
export class ScheduleSelectorComponent implements OnInit, OnDestroy {
  schedules: Schedule[] = [];
  private scheduleSub: Subscription;

  constructor(public schedulesService: SchedulesService) { }

  ngOnInit(): void {
    this.scheduleSub = this.schedulesService.userScheduleUpdateListener()
      .subscribe((schedules:Schedule[]) => {
        this.schedules = schedules;
      });
  }

  ngOnDestroy(): void {
    this.scheduleSub.unsubscribe();
  }

}
