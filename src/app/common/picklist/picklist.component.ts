import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { PickList } from 'src/app/models/picklist.model';
import { PicklistService } from 'src/app/services/picklist.service';

@Component({
  selector: 'app-picklist',
  templateUrl: './picklist.component.html',
  styleUrls: ['./picklist.component.css']
})
export class PicklistComponent extends FieldType implements OnInit {
 
  pickLists: PickList[];

  label: string;
  domain: string;

  fieldName: string;

  constructor(
    private pickListService: PicklistService
  ) {
    super();
  }

  ngOnInit(): void {
    this.label = this.to.label;
    this.domain = this.to.domain;
    this.fieldName = this.to.val;
    console.log('model - ' + JSON.stringify(this.to));
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


  onItemSelectionChanged(d: any) {
    console.log('d - ' + JSON.stringify(d));
    let p = this.pickLists.find(e => e.id === d);
    console.log('PL - ' + JSON.stringify(p));
    this.model[this.fieldName] = p?.value;
  }
}
