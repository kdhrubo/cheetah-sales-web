import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../../../models/link.model';
import { LinkService } from '../../../services/link.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  rsql = 'deleted==false';
  links: Link[];

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

  constructor(private formService: FormService, private linkService: LinkService) {}

  ngOnInit(): void {
    this.rsql = `deleted==false&relatedEntity=${this.related}&relatedEntityId=${this.relatedId}`;

    this.getFormConfig();
    this.search(this.rsql);
  }
  search(sql: string) {
    this.linkService.search(sql ).subscribe(
      data => {
        this.links = data;
      },
      error => console.log('Error - ' + error.message)
    );
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
    link.relatedEntity = this.related;
    link.relatedEntityId = this.relatedId;
    this.linkService.save(link).subscribe(
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
