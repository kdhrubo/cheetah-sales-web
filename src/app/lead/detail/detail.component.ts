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
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  form = new FormGroup({});
  lead: Lead;
  id: any;
  active = 1;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[];

  constructor(
    private route: ActivatedRoute,
    private leadService: LeadService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getLead();
  }

  getLead() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.leadService.findOne(this.id).subscribe(
      (data) => {
        this.lead = data;
        this.getLeadFormConfig();
      },
      (error) => {
        console.log('Unable to retrieve lead details');
      }
    );
  }

  updateSocial(inlead: any) {
   
    this.lead = inlead;
    
    this.onSubmit();
  }

  getLeadFormConfig() {
    this.formService.getFields('form-lead-detail').subscribe(
      (data) => {
        this.fields = data;
      },
      (error) => {
        console.log('Unable to retrieve lead form information');
      }
    );
  }

  edit() {
    this.options.formState.disabled = !this.options.formState.disabled;
  }

  onSubmit() {
    console.log('#### lead - ', JSON.stringify(this.lead));
    this.leadService.save(this.lead).subscribe(
      (data) => {
        console.log('Lead saved successfully.');
      },
      (error) => {
        console.log('Failed to update/save Lead details.');
      }
    );
  }
}
