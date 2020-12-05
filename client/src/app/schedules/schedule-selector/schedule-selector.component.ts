import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../models/Schedule.model';
import { SchedulesService } from '../schedules.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-schedule-selector',
  templateUrl: './schedule-selector.component.html',
  styleUrls: ['./schedule-selector.component.css']
})
export class ScheduleSelectorComponent implements OnInit {
  @Input() schedules: Schedule[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
