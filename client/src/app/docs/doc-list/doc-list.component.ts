import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocsService } from '../docs.service';
import { Subscription } from 'rxjs';
import { Doc } from '../../models/Doc.model'

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit, OnDestroy {
  docs:Doc[];
  private docSub: Subscription;
  isLoading: boolean = false;

  constructor(private docsService:DocsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.docsService.getDocs();
    this.docSub = this.docsService.docUpdateListener()
      .subscribe((docs:Doc[]) => {
        this.isLoading = false;
        this.docs = docs;
      })
  }

  ngOnDestroy(): void {
    this.docSub.unsubscribe();
  }

}
