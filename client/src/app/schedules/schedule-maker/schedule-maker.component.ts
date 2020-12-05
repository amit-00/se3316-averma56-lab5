import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SchedulesService } from '../schedules.service';


@Component({
  selector: 'app-schedule-maker',
  templateUrl: './schedule-maker.component.html',
  styleUrls: ['./schedule-maker.component.css']
})
export class ScheduleMakerComponent implements OnInit {

  constructor(public schedulesService: SchedulesService) { }

  ngOnInit(): void {
  }

  makeSchedule(form: NgForm) {
    const name:string = form.value.name;
    const desc:string = form.value.desc === null ? '' : form.value.desc ;
    const isPublic:boolean = form.value.isPublic !== true ? false : true;

    this.schedulesService.createSchedule(name, desc, isPublic);
    form.resetForm();
  }

}
