import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/AuthData.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}`


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated:boolean = false;
  private isAdmin:boolean = false;
  private token:string  = '';
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient, private router:Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    console.log(this.isAdmin);
    return this.isAdmin;
  }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  getAdminStatus() {
    return this.adminStatusListener.asObservable();
  }

  registerUser(name:string, email:string, password:string) {
    this.http.post<{token:string, isAdmin:boolean}>(`${API_URL}/users`, { name, email, password })
      .subscribe(t => {
        this.token = t.token;
        if(this.token){
          this.isAuthenticated = true;
          this.isAdmin = t.isAdmin;
          this.authStatusListener.next(true);
          this.adminStatusListener.next(t.isAdmin);
          this.saveAuthData(this.token);
          this.router.navigate(['/schedules']);
        }
      }, error => {
        this.authStatusListener.next(false);
      })
  }

  loginUser(email:string, password:string) {

    this.http.post<{token:string, isAdmin:boolean}>(`${API_URL}/auth`, { email, password })
      .subscribe(t => {
        this.token = t.token;
        if(this.token){
          this.isAuthenticated = true;
          this.isAdmin = t.isAdmin;
          this.saveAuthData(this.token);
          this.authStatusListener.next(true);
          this.adminStatusListener.next(t.isAdmin);
          this.router.navigate(['/schedules']);
        }
      }, error => {
        this.authStatusListener.next(false);
      })
    }

    logoutUser() {
      this.token = '';
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.clearAuthData();
      this.router.navigate(['/']);
    }

    autoAuthUser() {
      const authToken = this.getAuthData();
      if(!authToken) {
        return;
      }
      console.log(this.isAdmin);
      this.token = authToken;
      this.isAuthenticated = true;
      this.saveAuthData(authToken);
      this.authStatusListener.next(true);
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
