import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../models/Schedule.model';
import { SchedulesService } from '../../schedules/schedules.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-schedules',
  templateUrl: './public-schedules.component.html',
  styleUrls: ['./public-schedules.component.css']
})
export class PublicSchedulesComponent implements OnInit {
  schedules: Schedule[] = [];
  private scheduleSub: Subscription;
  pageSlice: Schedule[];
  isLoading:boolean = false;

  constructor(public schedulesService: SchedulesService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.schedulesService.getPublicSchedules();
    this.scheduleSub = this.schedulesService.publicScheduleUpdateListener()
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
