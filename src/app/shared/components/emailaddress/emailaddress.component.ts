import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from '../../../services/form.service';
import { Emails } from '../../../models/emails.model';

@Component({
  selector: 'app-emailaddress',
  templateUrl: './emailaddress.component.html',
  styleUrls: ['./emailaddress.component.css']
})
export class EmailaddressComponent implements OnInit {

  model = {};
  form = new FormGroup({});

  fields: FormlyFieldConfig[];

  @Input() emails: Emails;

  @Output() addEmail = new EventEmitter<object>();

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getFormConfig();
  }

  getFormConfig() {
    this.formService.getFields('form-emails').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {
    //console.log('Model - ' + this.model);
    //let emails: Emails = this.model as Emails;

    console.log('Model emailAddress- ' + JSON.stringify(this.emails));

    this.addEmail.emit(this.emails);
  }

}
