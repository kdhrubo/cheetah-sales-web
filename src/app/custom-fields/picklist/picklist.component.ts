import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PickList } from 'src/app/models/picklist.model';
import { PicklistService } from 'src/app/services/picklist.service';

@Component({
  selector: 'app-picklist',
  templateUrl: './picklist.component.html',
  styleUrls: ['./picklist.component.css']
})
export class PicklistComponent extends FieldType implements OnInit {
  to: any;
  pickLists: PickList[];

  label: string;
  domain: string;

  val = '';

  constructor(
    private modalService: NgbModal,
    private pickListService: PicklistService
  ) {
    super();
  }

  ngOnInit(): void {
    this.label = this.to.label;
    this.domain = this.to.attributes.pickList;

    // console.log('@@@ ckey -' + this.to.cKey);
    // console.log('model - ' + JSON.stringify(this.model[this.to.cKey]));
    // this.setField(this.model[this.to.cKey]);
    this.load();
  }

  load() {
    this.pickListService.findAll(this.domain).subscribe(
      data => {
        this.pickLists = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  setField(d: PickList) {
    console.log('d - ' + JSON.stringify(d));
    if ( d?.id != null ){
      this.val = d?.value;
      this.formControl.setValue(d?.id);
    }
  }
}
