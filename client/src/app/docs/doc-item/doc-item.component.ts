import { Component, Input, OnInit } from '@angular/core';
import { Doc } from '../../models/Doc.model';

@Component({
  selector: 'app-doc-item',
  templateUrl: './doc-item.component.html',
  styleUrls: ['./doc-item.component.css']
})
export class DocItemComponent implements OnInit {
  @Input() doc:Doc;

  constructor() { }

  ngOnInit(): void {
  }

  stringAsDate(dateStr: Date) {
    return new Date(dateStr);
  }

}
