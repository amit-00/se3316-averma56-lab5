import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/AuthData.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated:boolean = false;
  private isAdmin:boolean = false;
  private token:string  = '';
  private authStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient, private router:Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  registerUser(name:string, email:string, password:string) {
    const body:AuthData = {
      name,
      email,
      password
    }
    this.http.post<{token:string, isAdmin:boolean}>('http://localhost:5000/api/users', body)
      .subscribe(t => {
        this.token = t.token;
        this.isAdmin = t.isAdmin;
        if(this.token.length > 1){
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(this.token);
          this.router.navigate(['/schedules']);
        }
      })
  }

  autoAuthUser() {
    const authToken = this.getAuthData();
    if(!authToken) {
      return;
    }
    this.token = authToken;
    this.isAuthenticated = true;
    this.saveAuthData(authToken);
    this.authStatusListener.next(true);
  }

  loginUser(email:string, password:string) {
    const body = {
      email,
      password
    }

    this.http.post<{token:string, isAdmin:boolean}>('http://localhost:5000/api/auth', body)
      .subscribe(t => {
        this.token = t.token;
        this.isAdmin = t.isAdmin;
        if(this.token.length > 1){
          this.isAuthenticated = true;
          this.saveAuthData(this.token);
          this.authStatusListener.next(true);
          this.router.navigate(['/schedules']);
        }
      })
    }

    logoutUser() {
      this.token = '';
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.clearAuthData();
      this.router.navigate(['/']);
    }

    private saveAuthData(token:string) {
      localStorage.setItem('token', token);
    }

    private clearAuthData() {
      localStorage.removeItem('token');
    }

    private getAuthData() {
      const token = localStorage.getItem('token');
      if(!token){
        return;
      }

      return token
    }
}
