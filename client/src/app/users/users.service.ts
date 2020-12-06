import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/User.model'

import { environment } from '../../environments/environment';

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users:User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http:HttpClient) { }

  getUsers() {
    this.http.get<User[]>(API_URL)
      .subscribe(users => {
        this.users = users;
        this.usersUpdated.next([...this.users]);
      })
  }

  changeAdminStatus(isAdmin:boolean, id:string) {
    const body = {
      isAdmin
    }
    this.http.put<User>(`${API_URL}/users/admin/admin-status/${id}`, body)
      .subscribe(user => {
        const newUsers = this.users.filter(u => u._id !== user._id);
        newUsers.unshift(user);
        this.users = newUsers;
        this.usersUpdated.next([...this.users]);
      })
  }

  changeActiveStatus(deactivated:boolean, id:string) {
    const body = {
      deactivated
    }
    this.http.put<User>(`${API_URL}/users/admin/active-status/${id}`, body)
      .subscribe(user => {
        const newUsers = this.users.filter(u => u._id !== user._id);
        newUsers.unshift(user);
        this.users = newUsers;
        this.usersUpdated.next([...this.users]);
      })
  }

  userUpdateListener() {
    return this.usersUpdated.asObservable();
  }
}
