import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from '../../../models/link.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Output() addLink = new EventEmitter<object>();
  @Input() links: Link[];

  model = {};
  form = new FormGroup({});

  fields: FormlyFieldConfig[];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getFormConfig();
    
  }


  getFormConfig() {
    this.formService.getFields('form-link').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {
    let link: Link = this.model as Link;
    this.addLink.emit(link);

  }
}
