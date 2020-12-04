import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../models/Schedule.model';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private userSchedules: Schedule[] = [];
  private publicSchedules: Schedule[] = [];
  private userSchedulesUpdated = new Subject<Schedule[]>();
  private publicSchedulesUpdated = new Subject<Schedule[]>();


  constructor(private http: HttpClient) { }

  getPublicSchedules() {
    this.http.get<Schedule[]>('http://localhost:5000/api/schedule/public')
      .subscribe((schedules) => {
        this.publicSchedules = schedules;
        this.publicSchedulesUpdated.next([...this.publicSchedules]);
      });
  }

  getSchedules() {
    this.http.get<Schedule[]>('http://localhost:5000/api/schedule')
      .subscribe((schedules) => {
        this.userSchedules = schedules;
        this.userSchedulesUpdated.next([...this.userSchedules]);
      });
  }

  userScheduleUpdateListener() {
    return this.userSchedulesUpdated.asObservable()
  }

  publicScheduleUpdateListener() {
    return this.publicSchedulesUpdated.asObservable()
  }
}
