import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-picklist',
  templateUrl: './picklist.component.html',
  styleUrls: ['./picklist.component.css']
})
export class PicklistComponent extends FieldType implements OnInit {

  to: any;
  fields: any;
  dataPage: any;

  pageNo = 1;
  pageSize = 10;
  collectionSize: number;

  constructor(private modalService: NgbModal) {
    super();
  }

  ngOnInit(): void {
    console.log('OPTIONS - ' + JSON.stringify(this.options));
    console.log('OPTIONS - ' + JSON.stringify(this.to)); 
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  setField(d: any) {
    console.log('selected - ' + JSON.stringify(d));

  }

}
