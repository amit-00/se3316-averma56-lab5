import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl('', {validators: [Validators.required, Validators.email]}),
      'password': new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  login() {
    const email = this.form.value.email
    const password = this.form.value.password

    console.log(email, password)

    this.form.reset();
  }

}
