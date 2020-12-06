import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../../models/User.model'

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user:User;

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
  }

  changeAdminStatus() {
    if(!this.user){
      return;
    }

    const newAdmin = !this.user.isAdmin;

    this.usersService.changeAdminStatus(newAdmin, this.user._id);
  }

  changeActiveStatus() {
    if(!this.user){
      return;
    }

    const newActive = !this.user.deactivated;

    this.usersService.changeActiveStatus(newActive, this.user._id);
  }

}
