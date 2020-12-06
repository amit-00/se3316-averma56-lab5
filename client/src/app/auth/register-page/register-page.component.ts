import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private authStatusSub: Subscription;
  isLoading:boolean;


  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl('', {validators: [Validators.required]}),
      'email': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
    });

    this.authStatusSub = this.authService.getAuthStatus()
      .subscribe(status => {
        this.isLoading = status;
      })
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }


  register() {
    if(this.form.invalid){
      return;
    }
    const name = this.form.value.name
    const email = this.form.value.email
    const password = this.form.value.password

    this.isLoading = true;
    this.authService.registerUser(name, email, password);
  }


}
