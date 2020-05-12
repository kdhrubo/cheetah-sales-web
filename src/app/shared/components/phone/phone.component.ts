import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Phone } from 'src/app/models/phone.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  @Input() phones: Phone[];
  @Output() addPhone = new EventEmitter<object>();

  model = {};
  form = new FormGroup({});

  fields: FormlyFieldConfig[];


  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getFormConfig();
    
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
    this.addPhone.emit(phone);
  }

}
