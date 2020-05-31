import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { DocumentItem } from '../models/document.model';
import { FormService } from '../services/form.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  parentName = 'root';
  currentDoc: DocumentItem;
  prevDoc: DocumentItem;

  documents: DocumentItem [];

  model = {};

  form = new FormGroup({});

  fields: FormlyFieldConfig[];

  constructor(private modalService: NgbModal,
              private documentService: DocumentService
    ,         private formService: FormService) {

  }

  ngOnInit(): void {
    const rsql = `deleted==false;parentName=="${this.parentName}"`;
    this.search(rsql);
  }

  search(sql: string) {
    this.documentService.search(sql ).subscribe(
      data => {
        this.documents = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  openCreateFolder(content) {

    this.loadForm('create-folder-form', content);
  }

  onSubmitForNewFolder() {
    const docItem: DocumentItem = this.model as DocumentItem;

    docItem.documentType = 'folder';
    docItem.parentName = this.currentDoc ? this.currentDoc?.name : this.parentName;
    docItem.parentId = this.currentDoc?.id;

    const rsql = `deleted==false;parentName=="${this.parentName}"`;

    console.log('Save folder  - ' + JSON.stringify(docItem));

    this.documentService.saveFolder(docItem).subscribe(
      (data) => {
        console.log('DocumentItem save success');
        this.search(rsql);
      },
      (error) => {
        console.log('DocumentItem save failure');
      }
    );
  }

  openCreateFile(content) {

    this.loadForm('create-file-form', content);
  }

  onSubmitForNewFile() {
    const docItem: DocumentItem = this.model as DocumentItem;

    const rsql = `deleted==false;parentName=="${this.parentName}"`;

    const formData: FormData = new FormData();
    formData.append('file', this.model.file[0]);

    formData.append('parentName', this.currentDoc ? this.currentDoc?.name : this.parentName);
    formData.append('parentId', this.currentDoc? this.currentDoc?.id : null);

    formData.append('documentSourceId', docItem.documentSourceId);
    formData.append('documentSource', docItem.documentSource);

    this.documentService.saveFile(formData).subscribe(
      (data) => {
        console.log('DocumentItem save success');
        this.search(rsql);
      },
      (error) => {
        console.log('DocumentItem save failure');
      }
    );

  }

  loadForm(formName: string, content: any) {
    this.formService.getFields(formName).subscribe(
      (data) => {
        this.fields = data;
        this.modalService.open(content, { size: 'lg', centered: true });
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  go(doc: DocumentItem) {
    this.parentName = doc.name;
    this.prevDoc = this.currentDoc;
    this.currentDoc = doc;
    // console.log('current doc - ' + JSON.stringify(this.currentDoc));
    const rsql = `deleted==false;parentName=="${this.parentName}"`;
    this.search(rsql);
  }

  goBack() {
    this.parentName = this.currentDoc?.parentName;
    this.currentDoc = this.prevDoc;
    const rsql = `deleted==false;parentName=="${this.parentName}"`;
    // console.log('rsql - ' + rsql);
    this.search(rsql);
  }

}
