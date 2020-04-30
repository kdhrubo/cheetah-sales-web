import { Component, OnInit, Input } from '@angular/core';
import { Phone } from 'src/app/models/phone.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from '../../../services/form.service';
import { PhoneService } from '../../../services/phone.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  rsql = 'deleted==false';
  phones: Phone[];

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

  constructor(private formService: FormService, private phoneService: PhoneService) {}

  ngOnInit(): void {
    this.rsql = `deleted==false&relatedEntity=${this.related}&relatedEntityId=${this.relatedId}`;

    this.getFormConfig();
    this.search(this.rsql);
  }
  search(sql: string) {
    this.phoneService.search(sql ).subscribe(
      data => {
        this.phones = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  getFormConfig() {
    this.formService.getFields('form-phone').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {
    let phone: Phone = this.model as Phone;
    phone.relatedEntity = this.related;
    phone.relatedEntityId = this.relatedId;
    this.phoneService.save(phone).subscribe(
      (data) => {
        console.log('Link save success');
        this.search(this.rsql);
      },
      (error) => {
        console.log('Link save failure');
      }
    );

  }

}
