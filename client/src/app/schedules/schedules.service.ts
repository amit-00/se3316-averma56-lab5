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
        const newSchedule: Schedule = { 
          _id: schedule._id, 
          name: schedule.name,
          desc: schedule.desc,
          isPublic: schedule.isPublic,
          courses: schedule.courses,
          modified: schedule.modified
          }
        this.userSchedules.push(newSchedule);
        this.userSchedulesUpdated.next([...this.userSchedules]);
      });
  }

  updateSchedule(id:string, name:string, desc:string, isPublic:boolean) {
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
      })
  }

  deleteSchedule(delName: string) {
    this.http.delete(`http://localhost:5000/api/schedule/delete/${delName}`)
      .subscribe(() => {
        const updatedSchedules = this.userSchedules.filter(schedule => schedule.name !== delName);
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
