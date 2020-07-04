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

  folderModel = {name: null, container: null};
  fileModel = {};
  container = '/';
  prevContainer = '';

  documents: DocumentItem [];

  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(private modalService: NgbModal,
              private documentService: DocumentService
    ,         private formService: FormService) {

  }

  ngOnInit(): void {
    const rsql = `deleted==false;container=="${this.container}"`;
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
    this.folderModel = {name: null, container: null};
    this.loadForm('form-create-folder', content);
  }

  onCreateFolder() {
    const rsql = `deleted==false;container=="${this.container}"`;

    this.folderModel.container = this.container;

    this.documentService.saveFolder(this.folderModel).subscribe(
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

    this.loadForm('form-create-file', content);
  }

  onCreateFile() {
    console.log('Save file  - ' + this.fileModel);
    const docItem: DocumentItem = this.fileModel as DocumentItem;


    const rsql = `deleted==false;container=="${this.container}"`;

    const formData: FormData = new FormData();
    formData.append('file', docItem?.file[0]);
    formData.append('container', this.container);

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

  delete(d: DocumentItem) {

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

}
