import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users:User[];
  @Input() pageSlice: User[];

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.users.length){
      endIndex = this.users.length;
    }
    this.pageSlice = this.users.slice(startIndex, endIndex);
  }

}
