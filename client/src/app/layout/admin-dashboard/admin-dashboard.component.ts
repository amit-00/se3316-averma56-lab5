import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  users:User[];
  pageSlice:User[];
  private userSub: Subscription;
  isLoading: boolean = false;

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.usersService.getUsers();
    this.userSub = this.usersService.userUpdateListener()
      .subscribe((users:User[]) => {
        this.isLoading = false;
        this.users = users;
        this.pageSlice = this.users.slice(0,5);
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

}
