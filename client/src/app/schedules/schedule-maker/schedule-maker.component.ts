import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Schedule } from '../../models/Schedule.model';
import { Course } from '../../models/Course.model';
import { SchedulesService } from '../schedules.service';


@Component({
  selector: 'app-schedule-maker',
  templateUrl: './schedule-maker.component.html',
  styleUrls: ['./schedule-maker.component.css']
})
export class ScheduleMakerComponent implements OnInit {

  constructor(public schedulesService: SchedulesService, public route:ActivatedRoute) { }
  mode:string = 'create';
  private scheduleId: string | null;
  schedule: Schedule;
  pageSlice: Course[];
  isLoading:boolean = false;
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl('', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)]}),
      'desc': new FormControl(''),
      'isPublic': new FormControl(false)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('scheduleId')){
        this.mode = 'edit';
        this.scheduleId = paramMap.get('scheduleId');
        this.isLoading = true;
        this.schedulesService.getUserSchedule(this.scheduleId)
          .subscribe((schedule) => {
            this.isLoading = false;
            this.schedule = schedule;
            this.pageSlice = this.schedule.courses.slice(0,5);
            this.form.setValue({'name': this.schedule.name, 'desc': this.schedule.desc, 'isPublic': this.schedule.isPublic})
          })
      }
      else{
        this.mode = 'create'
        this.scheduleId = null;
      }
    });

  }

  saveSchedule() {
    const name:string = this.form.value.name;
    const desc:string = this.form.value.desc === null ? '' : this.form.value.desc ;
    const isPublic:boolean = this.form.value.isPublic !== true ? false : true;
    this.isLoading = true;
    if(this.mode === 'create'){
      this.schedulesService.createSchedule(name, desc, isPublic);
    }
    else if(this.mode === 'edit') {
      this.schedulesService.updateSchedule(this.scheduleId, name, desc, isPublic);
    }
    this.form.reset();
  }

}
