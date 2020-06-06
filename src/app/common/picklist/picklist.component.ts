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
    
    let p = this.pickLists.find(e => e.id === d);
    this.model[this.fieldName] = p?.value;
  }
}
