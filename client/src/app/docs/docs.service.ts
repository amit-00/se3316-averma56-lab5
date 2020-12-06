import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Doc } from '../models/Doc.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  private docs:Doc[] = [];
  private docsUpdated = new Subject<Doc[]>();

  constructor(private http:HttpClient, private router:Router) { }

  docUpdateListener() {
    return this.docsUpdated.asObservable();
  }

  getDocs() {
    this.http.get<Doc[]>('http://localhost:5000/api/docs')
      .subscribe((docs) => {
        this.docs = docs;
        this.docsUpdated.next([...this.docs]);
      });
  }

  updateDoc(id:string, content:string) {
    this.http.put<Doc>(`http://localhost:5000/api/docs/${id}`, {content})
      .subscribe(doc => {
        const newDocs = this.docs.filter(d => d._id !== doc._id);
        newDocs.unshift(doc);
        this.docs = newDocs;
        this.docsUpdated.next([...this.docs]);
        this.router.navigate(['/admin-dashboard']);
      })
  }

  getDocById(id:string){
    return this.http.get<Doc>(`http://localhost:5000/api/docs/doc/${id}`);
  }

  getDocByTitle(title:string) {
    return this.http.get<Doc>(`http://localhost:5000/api/docs/title/${title}`);
  }

}
