import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Review } from '../../models/Review.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() reviews: Review[];
  @Input() pageSlice: Review[];

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.reviews.length){
      endIndex = this.reviews.length;
    }
    this.pageSlice = this.reviews.slice(startIndex, endIndex);
  }

}
