import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchCourses(form: NgForm) {
    const formData = {
      catalog_nbr: form.value.catalog_nbr,
      subject: form.value.subject,
      ssr_component: form.value.ssr_component
    }
    form.resetForm();
  }

}
