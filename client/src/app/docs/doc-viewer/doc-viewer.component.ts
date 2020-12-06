import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Doc } from '../../models/Doc.model';
import { DocsService } from '../docs.service';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {
  private docTitle:string;
  isLoading:boolean = false;
  doc: Doc;
  form: FormGroup;

  constructor(public route:ActivatedRoute, private docsService:DocsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'content': new FormControl('', {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('docTitle')){
        this.docTitle = paramMap.get('docTitle');
        this.isLoading = true;
        this.docsService.getDocByTitle(this.docTitle)
          .subscribe(doc => {
            this.isLoading = false;
            this.doc = doc;
            this.form.setValue({'content': this.doc.content})
          })
      }
    })
  }

}
