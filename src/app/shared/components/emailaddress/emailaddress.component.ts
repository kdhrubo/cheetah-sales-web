import { Component, OnInit, Input } from '@angular/core';
import { EmailAddress } from 'src/app/models/emailaddress.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from 'src/app/services/form.service';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note.model';
import { EmailaddressService } from 'src/app/services/emailaddress.service';

@Component({
  selector: 'app-emailaddress',
  templateUrl: './emailaddress.component.html',
  styleUrls: ['./emailaddress.component.css']
})
export class EmailaddressComponent implements OnInit {

  rsql = 'deleted==false';
  emailAddresses: EmailAddress[];

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

  constructor(private formService: FormService, private emailaddressService: EmailaddressService) {}

  ngOnInit(): void {
    this.rsql = `deleted==false&relatedEntity=${this.related}&relatedEntityId=${this.relatedId}`;

    this.getFormConfig();
    this.search(this.rsql);
  }
  search(sql: string) {
    this.emailaddressService.search(sql ).subscribe(
      data => {
        this.emailAddresses = data;
      },
      error => console.log('Error - ' + error.message)
    );
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
    let emailAddress: EmailAddress = this.model as EmailAddress;
    emailAddress.relatedEntity = this.related;
    emailAddress.relatedEntityId = this.relatedId;
    this.emailaddressService.save(emailAddress).subscribe(
      (data) => {
        console.log('EmailAddress save success');
        this.search(this.rsql);
      },
      (error) => {
        console.log('EmailAddress save failure');
      }
    );

  }

}
