import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  @Input() formName: any;
  @Output() updateSocial = new EventEmitter<object>();
  @Input() social: any;

  form = new FormGroup({});

  fields: FormlyFieldConfig[];

  constructor(private formService: FormService) {}

  ngOnInit(): void {

    this.getFormConfig();

  }

  getFormConfig() {
    this.formService.getFields(this.formName).subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {
    this.updateSocial.emit(this.social);
  }
}
