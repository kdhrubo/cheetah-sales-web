import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/services/lead.service';
import { Lead } from 'src/app/models/lead.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  form = new FormGroup({});
  leadModel: Lead;
  id: any;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[];

  constructor(
    private route: ActivatedRoute,
    private leadService: LeadService, private formService: FormService) { }

  ngOnInit(): void {
    this.getLead();
  }

  getLead() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.leadService.findOne(this.id)
      .subscribe(
        data => {
          this.leadModel = data;
          console.log('# contact - ', JSON.stringify(this.leadModel));
          console.log('=== get Lead form config ===');
          this.getLeadFormConfig();
        },
        error => {
          console.log('Unable to retrieve lead details');
        }

      );
  }

  getLeadFormConfig() {
    this.formService.getFields('lead-form').subscribe(
      data => {
        this.fields = data;
      },
      error => {
        console.log('Unable to retrieve lead form information');
      }
    );
  }

  edit() {
    this.options.formState.disabled = !this.options.formState.disabled;
  }

  onSubmit() {
    this.leadService.save(this.leadModel)
      .subscribe(
        data => {
          console.log('Lead saved successfully.');
        },
        error => {
          console.log('Failed to update/save Lead details.');
        }
      );
  }

}
