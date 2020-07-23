import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '../../../models/address.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  @Input() address: any;
  @Input() headerText: string;
  @Output() updateAddress = new EventEmitter<object>();


  constructor(
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getFormConfig();
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
    this.updateAddress.emit(this.address);
  }
}
