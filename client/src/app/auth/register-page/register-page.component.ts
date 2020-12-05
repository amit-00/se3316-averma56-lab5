import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl('', {validators: [Validators.required]}),
      'email': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      'Cpassword': new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  register() {
    const email = this.form.value.email
    const password = this.form.value.password

    console.log(email, password)

    this.form.reset();
  }

}
