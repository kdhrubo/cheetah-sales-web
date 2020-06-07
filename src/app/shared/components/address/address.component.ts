import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '../../../models/address.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from 'src/app/services/form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  model = {};
  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  @Input() address: Address;
  @Input() headerText: string;
  @Output() addAddress = new EventEmitter<object>();


  constructor(
    private modalService: NgbModal,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getFormConfig();
  }


  openLg(content) {

    if(this.address) {
      for (let key of Object.keys(this.address)) {
        this.model[key] =  this.address[key];
      }
    }
    this.modalService.open(content, { size: 'lg' });

  }

  getFormConfig() {
    this.formService.getFields('form-address').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {
    const address: Address = this.model as Address;
    Object.keys(address).forEach((key) => (address[key] === null || address[key] === '') && delete address[key]);
    this.addAddress.emit(address);
  }
}
