import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Lead } from '../../models/lead.model';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] ;





  constructor(private leadService: LeadService, private formService: FormService) { }

  ngOnInit(): void {
    this.formService.getFields('lead-form').subscribe(

      data => {
        this.fields = data;
        console.log('Retrieved lead form information sucessfully.');
      },
      error => {
        console.log('Unable to retrieve lead form information.');
      }

    );
  }

  onSubmit() {
    console.log(JSON.stringify(this.model));
    const lead: Lead = this.model as Lead;
    Object.keys(lead).forEach((key) => (lead[key] === null || lead[key] === '') && delete lead[key]);
    console.log('=== after clean up lead model ====');
    console.log(JSON.stringify(lead));

    this.leadService.save(lead)
    .subscribe(
      data => {
        console.log('Lead save success');
      },
      error => {
        console.log('Lead save failure');
      }
    );
  }


}
