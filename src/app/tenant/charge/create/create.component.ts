import { Component, OnInit } from '@angular/core';
import { ChargeService } from '../../../services/charge.service';
import { Charge } from 'src/app/models/charge/charge.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[];

  constructor(private chargeService: ChargeService, private formService: FormService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.formService.getFields('Charge-form').subscribe(

      data => {
        this.fields = data;
        console.log('Retrieved charge form information sucessfully.');
      },
      error => {
        console.log('Unable to retrieve charge form information.');
      }

    );
  }

  onSubmit() {
    const charge: Charge = this.model as Charge;
    Object.keys(charge).forEach((key) => (charge[key] === null || charge[key] === '') && delete charge[key]);

    this.chargeService.save(charge)
      .subscribe(
        data => {
          this.toastr.success('Charge Saved Successfully.', '', {});
          this.router.navigate(['/app/cockpit/charge/list', data?.id]);
        },
        error => {
          this.toastr.error('Charge save failed.', error?.detail, {});
        }
      );
  }

}
