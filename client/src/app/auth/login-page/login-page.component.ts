import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading:boolean;
  private authStatusSub: Subscription

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl('', {validators: [Validators.required, Validators.email]}),
      'password': new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });

    this.authStatusSub = this.authService.getAuthStatus()
      .subscribe(status => {
        this.isLoading = status
      })
  }

  ngOnDestroy(): void{
    this.authStatusSub.unsubscribe();
  }

  login() {
    const email = this.form.value.email
    const password = this.form.value.password

    this.isLoading = true;
    this.authService.loginUser(email, password);
  }

  

}
