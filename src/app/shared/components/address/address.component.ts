import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../../models/address.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from 'src/app/services/form.service';
import { AddressService } from 'src/app/services/address.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  rsql = 'deleted==false';
  addresses: Address[];

  model = {};
  form = new FormGroup({});

  fields: FormlyFieldConfig[];

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  @Input() related: string;
  @Input() relatedId: string;

  constructor(private modalService: NgbModal,private formService: FormService, private addressService: AddressService) {}

  ngOnInit(): void {
    this.rsql = `deleted==false&relatedEntity=${this.related}&relatedEntityId=${this.relatedId}`;

    this.getFormConfig();
    this.search(this.rsql);
  }

  edit(address: Address) {}

  openLg(content) {

    console.log('content - ' + content);

    this.modalService.open(content, { size: 'lg' });
  }

  search(sql: string) {
    this.addressService.search(sql ).subscribe(
      data => {
        this.addresses = data;
      },
      error => console.log('Error - ' + error.message)
    );
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
    address.relatedEntity = this.related;
    address.relatedEntityId = this.relatedId;
    this.addressService.save(address).subscribe(
      (data) => {
        console.log('Address save success');
        this.search(this.rsql);
      },
      (error) => {
        console.log('Address save failure');
      }
    );

  }

}
