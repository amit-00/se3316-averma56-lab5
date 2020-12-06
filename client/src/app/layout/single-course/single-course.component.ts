import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../courses/courses.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Course } from '../../models/Course.model';
import { Review } from '../../models/Review.model';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {
  form: FormGroup;
  course:Course;
  pageSlice: Review[];
  private courseId:string;
  isLoading: boolean = false;
  title:string;

  constructor(private coursesService:CoursesService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'comment': new FormControl('', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(250)]})
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('courseId')){
        this.courseId = paramMap.get('courseId');
        this.isLoading = true;
        this.coursesService.getCourse(this.courseId)
          .subscribe(course => {
            this.course = course;
            this.isLoading = false;
            this.title = `${course.subject} ${course.catalog_nbr} - ${course.className}`;
            this.pageSlice = this.course.reviews.slice(0,5);
          })
      }
    });
  }


  addReview(){
    const comment = this.form.value.comment;
    this.isLoading = true;
    this.coursesService.addReview(comment, this.course._id);
  }

  //Dynamic Classes
  setComponent(){
    let classes= {
      LEC: this.course.course_info[0].ssr_component === 'LEC',
      TUT: this.course.course_info[0].ssr_component === 'TUT',
      LAB: this.course.course_info[0].ssr_component === 'LAB'
    }

    return classes;
  }

}
