import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Schedule } from 'src/app/models/Schedule.model';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  @Input() schedules: Schedule[];
  @Input() pageSlice: Schedule[];

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.schedules.length){
      endIndex = this.schedules.length;
    }
    this.pageSlice = this.schedules.slice(startIndex, endIndex);
  }

}
