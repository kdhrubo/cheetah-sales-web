import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { DealService } from 'src/app/services/deal.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Deal } from 'src/app/models/deal.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model = {  };
  fields: FormlyFieldConfig[];

  constructor(private dealService: DealService,
              private formService: FormService,
              private toastr: ToastrService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.formService.getFields('form-deal-create').subscribe(
      data => {
        this.fields = data;
        console.log('Retrieved deal form information sucessfully.');
      },
      error => {
        console.log('Unable to retrieve deal form information.');
      }
    );
  }


  onSubmit() {
    const deal: Deal = this.model as Deal;
    Object.keys(deal).forEach((key) => (deal[key] === null || deal[key] === '') && delete deal[key]);
    console.log(JSON.stringify(deal));

    this.dealService.save(deal)
      .subscribe(
        data => {
          this.toastr.success('Deal Saved Successfully.', '', {});
          this.router.navigate(['/deals' , data?.id]);
        },
        error => {
          console.log('Deal save failure.');
        }
      );
  }
}
