import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl('', {validators: [Validators.required, Validators.email]}),
      'password': new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  login() {
    const email = this.form.value.email
    const password = this.form.value.password

    this.authService.loginUser(email, password);
  }

}
