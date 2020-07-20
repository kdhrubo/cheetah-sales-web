import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Lead } from '../../models/lead.model';
import { FormService } from 'src/app/services/form.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] ;


  constructor(private leadService: LeadService,
              private formService: FormService,
              private toastr: ToastrService,
              private router: Router ) { }

  ngOnInit(): void {
    this.formService.getFields('form-lead-create').subscribe(

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
    const lead: Lead = this.model as Lead;
    Object.keys(lead).forEach((key) => (lead[key] === null || lead[key] === '') && delete lead[key]);

    this.leadService.save(lead)
    .subscribe(
      data => {
        this.toastr.success('Lead Saved Successfully.', '', {});
        this.router.navigate(['/app/leads' , data?.id]);
      },
      error => {
        this.toastr.error('Lead update failed.', error?.detail, {});
      }
    );
  }


}
