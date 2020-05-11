import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmailAddress } from '../../../models/emailaddress.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from '../../../services/form.service';
import { EmailaddressService } from '../../../services/emailaddress.service';

@Component({
  selector: 'app-emailaddress',
  templateUrl: './emailaddress.component.html',
  styleUrls: ['./emailaddress.component.css']
})
export class EmailaddressComponent implements OnInit {

  model = {};
  form = new FormGroup({});

  fields: FormlyFieldConfig[];

  @Input() emailAddresses: EmailAddress[];

  @Output() addEmail = new EventEmitter<object>();

  constructor(private formService: FormService, private emailaddressService: EmailaddressService) {}

  ngOnInit(): void {
    this.getFormConfig();
  }

  getFormConfig() {
    this.formService.getFields('form-emailaddress').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {
    console.log('Model - ' + this.model);
    let emailAddress: EmailAddress = this.model as EmailAddress;

    console.log('Model emailAddress- ' + JSON.stringify(emailAddress));

    this.addEmail.emit(emailAddress);
  }

}
