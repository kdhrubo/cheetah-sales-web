import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { DocumentItem } from '../models/document.model';
import { FormService } from '../services/form.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as fileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  folderModel = {name: null, container: null};
  fileModel = {};
  container = '/';
  pathStack: Array<string> = [];

  documents: DocumentItem [];

  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  constructor(private modalService: NgbModal,
              private documentService: DocumentService,
              private formService: FormService,
              private toastr: ToastrService) {

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
        this.modalService.dismissAll();
        this.toastr.success('Folder created successfully.', '', {});
        this.search(rsql);
      },
      (error) => {
        this.modalService.dismissAll();
        this.toastr.error('Failed to create folder.', error?.detail, {});
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
        this.modalService.dismissAll();
        this.toastr.success('File created successfully.', '', {});
        this.search(rsql);
      },
      (error) => {
        this.modalService.dismissAll();
        this.toastr.error('Failed to create file.', error?.detail, {});
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
    this.documentService.delete(d.id).subscribe(
      (data) => {
        this.toastr.success('File deleted successfully.', '', {});
        const rsql = `deleted==false;container=="${this.container}"`;
        this.search(rsql);
      },
      (error) => {
        console.log('DocumentItem delete failure.');
        this.toastr.error('Failed to delete file.', error?.detail, {});
      }
    );
  }

  download(d: DocumentItem) {
    console.log('download - ' + d.id);
    this.documentService.download(d.id).subscribe(
      (data) => {
        console.log('DocumentItem download success.');
        this.saveFile(data, d.name);
      },
      (error) => {
        console.log('DocumentItem download failure.');
      }
    );
  }
  saveFile(data: any, filename?: string) {
    const blob = new Blob([data]);
    fileSaver.saveAs(blob, filename);
  }

  goFwd(doc: DocumentItem) {

    this.pathStack.push(this.container);
    this.container = doc.path;

    const rsql = `deleted==false;container=="${this.container}"`;
    this.search(rsql);
  }

  goBack() {
    this.container = this.pathStack.pop();
    const rsql = `deleted==false;container=="${this.container}"`;
    this.search(rsql);
  }

}
