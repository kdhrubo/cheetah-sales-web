import { Component, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { PicklistService } from 'src/app/services/picklist.service';
import { PickList } from 'src/app/models/picklist.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'formly-select-wrapper',
  templateUrl: './selectwrapper.component.html',
  styleUrls: ['./selectwrapper.component.css']
})
export class SelectwrapperComponent extends FieldWrapper implements OnInit {
  label: string;
  domain: any;
  pickLists: PickList[];

  constructor(private pickListService: PicklistService) {
    super();
    console.log('** select wrapper **');
  }

  ngOnInit(): void {

    this.label = this.to.label;
    this.domain = this.to.domain;
    console.log('** Calling load - ' + this.domain);
    this.load();
  }

  load() {
    this.pickListService.findAll(this.domain).subscribe(
      data => {
        this.pickLists = data;
        console.log('picklists - ' + JSON.stringify(data));
        this.to.options = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

}
