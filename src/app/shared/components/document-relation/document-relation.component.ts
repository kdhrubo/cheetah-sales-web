import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Page } from '../../../models/page.model';
import { DocumentItem } from '../../../models/document.model';
import { DocumentService } from 'src/app/services/document.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-document-relation',
  templateUrl: './document-relation.component.html',
  styleUrls: ['./document-relation.component.css']
})
export class DocumentRelationComponent implements OnInit {

  rsql = 'deleted==false';

  documentItems: DocumentItem[];
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;

  fields = [

    {
      id: 3,
      name: 'name',
      label: 'Name'
    }

  ];

  container = '/';
  prevContainer = '';

  @Input() documents: DocumentItem[];
  @Output() addDocument = new EventEmitter<object>();
  @Output() removeDocument = new EventEmitter<object>();

  constructor(
              private modalService: NgbModal,
              private documentService: DocumentService
  ) { }

  ngOnInit(): void {

  }

  goFwd(doc: DocumentItem) {
    this.prevContainer = this.container;
    this.container = doc.path;
    const rsql = `deleted==false;container=="${this.container}"`;
    this.search(rsql);
  }

  goBack() {
    const rsql = `deleted==false;container=="${this.prevContainer}"`;
    // console.log('rsql - ' + rsql);
    this.search(rsql);
  }

  add(document: any) {
    this.addDocument.emit(document);

  }

  remove(document: any) {
    this.removeDocument.emit(document);
  }

  search(sql: string) {
    this.documentService.search(sql ).subscribe(
      data => {
        this.documentItems = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  openLg(content) {
    const rsql = `deleted==false;container=="${this.container}"`;
    this.search(rsql);
    this.modalService.open(content, { size: 'lg' });
  }

}
