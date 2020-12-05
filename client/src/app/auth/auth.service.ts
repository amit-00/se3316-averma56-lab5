import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/AuthData.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:string;

  constructor(private http:HttpClient, private router:Router) { }

  getToken() {
    return this.token;
  }

  registerUser(name:string, email:string, password:string) {
    const body:AuthData = {
      name,
      email,
      password
    }
    this.http.post<string>('http://localhost:5000/api/users', body)
      .subscribe(t => {
        this.token = t;
        this.router.navigate(['/schedules']);
      })
  }

  loginUser(email:string, password:string) {
    const body = {
      email,
      password
    }

    this.http.post<string>('http://localhost:5000/api/auth', body)
      .subscribe(t => {
        this.token = t;
        this.router.navigate(['/schedules']);
      })

  }
}
