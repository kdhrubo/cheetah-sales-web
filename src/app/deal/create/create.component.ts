import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { DealService } from 'src/app/services/deal.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Deal } from 'src/app/models/deal.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[];

  constructor(private dealService: DealService, private formService: FormService) { }

  ngOnInit(): void {
    this.fetchDealForm();
  }

  fetchDealForm(): void {
    this.formService.getFields('deal-form').subscribe(
      data => {
        this.fields = data;
        console.log('Retrieved deal form information sucessfully.');
      },
      error => {
        console.log('Unable to retrieve deal form information.');
      }
    );
  }

  saveDeal() {
    console.log(JSON.stringify(this.model));
    const deal: Deal = this.model as Deal;
    Object.keys(deal).forEach((key) => (deal[key] === null || deal[key] === '') && delete deal[key]);
    console.log('=== After clean up deal model ====');
    console.log(JSON.stringify(deal));

    this.dealService.save(deal)
      .subscribe(
        data => {
          console.log('Deal saved successfully:');
        },
        error => {
          console.log('Exception reported while saving deal:');
        }
      );
  }
}
