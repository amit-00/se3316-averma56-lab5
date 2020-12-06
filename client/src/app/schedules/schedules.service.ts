import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../models/Schedule.model';
import { Subject } from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private userSchedules: Schedule[] = [];
  private publicSchedules: Schedule[] = [];
  private userSchedulesUpdated = new Subject<Schedule[]>();
  private publicSchedulesUpdated = new Subject<Schedule[]>();


  constructor(private http: HttpClient, private router:Router) { }

  getPublicSchedules() {
    this.http.get<Schedule[]>('http://localhost:5000/api/schedule/public')
      .subscribe((schedules) => {
        this.publicSchedules = schedules;
        this.publicSchedulesUpdated.next([...this.publicSchedules]);
      });
  }

  getSchedules() {
    this.http.get<Schedule[]>('http://localhost:5000/api/schedule/user')
      .subscribe((schedules) => {
        this.userSchedules = schedules;
        this.userSchedulesUpdated.next([...this.userSchedules]);
      });
  }

  getUserSchedule(id:string|null) {
    return this.http.get<Schedule>(`http://localhost:5000/api/schedule/${id}`);
  }

  addCourse(body:any) {
    this.http.put<Schedule>('http://localhost:5000/api/schedule/courses/add', body)
      .subscribe(schedule => {
        const newSchedules = this.userSchedules.map(sche => {
          if(sche.name === schedule.name){
            sche.courses = schedule.courses
          }
          return sche;
        });

        this.userSchedules = newSchedules;
        this.userSchedulesUpdated.next([...this.userSchedules]);
      })
  }

  createSchedule(name:string, desc:string, isPublic:boolean) {
    const body = {
      name,
      desc,
      isPublic
    }
    this.http.post<Schedule>('http://localhost:5000/api/schedule', body)
      .subscribe((schedule) => {
        this.userSchedules.push(schedule);
        this.userSchedulesUpdated.next([...this.userSchedules]);
        this.router.navigate(['/schedules']);
      });
  }

  updateSchedule(id:string|null, name:string, desc:string, isPublic:boolean) {
    const body = {
      name,
      desc,
      isPublic
    }
    this.http.put<Schedule>(`http://localhost:5000/api/schedule/update/${id}`, body)
      .subscribe(schedule => {
        const newSchedules = this.userSchedules.filter(sche => sche._id !== schedule._id);
        newSchedules.unshift(schedule);
        this.userSchedules = newSchedules;
        this.userSchedulesUpdated.next([...this.userSchedules]);
        this.router.navigate(['/schedules']);
      })
  }

  deleteSchedule(id: string) {
    this.http.delete(`http://localhost:5000/api/schedule/delete/${id}`)
      .subscribe(() => {
        const updatedSchedules = this.userSchedules.filter(schedule => schedule._id !== id);
        this.userSchedules = updatedSchedules;
        this.userSchedulesUpdated.next([...this.userSchedules]);
      })
  }

  userScheduleUpdateListener() {
    return this.userSchedulesUpdated.asObservable()
  }

  publicScheduleUpdateListener() {
    return this.publicSchedulesUpdated.asObservable()
  }
}
