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

  @Input() addresses: Address[];

  @Output() addAddress = new EventEmitter<object>();


  constructor(
    private modalService: NgbModal,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getFormConfig();
  }

  edit(address: Address) {}

  openLg(content) {
    console.log('content - ' + content);

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
    let address: Address = this.model as Address;

    console.log('Model address- ' + JSON.stringify(address));

    this.addAddress.emit(address);
  }
}
