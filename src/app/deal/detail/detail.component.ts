import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Deal } from 'src/app/models/deal.model';
import { ActivatedRoute } from '@angular/router';
import { DealService } from 'src/app/services/deal.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  form = new FormGroup({});
  dealModel: Deal;
  id: any;
  active = 1;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[];

  constructor(private route: ActivatedRoute,
    private dealService: DealService, private formService: FormService) { }

  ngOnInit(): void {
    this.getDeal();
  }

  getDeal() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dealService.findOne(this.id)
      .subscribe(
        data => {
          this.dealModel = data;
          console.log('# deal - ', JSON.stringify(this.dealModel));
          console.log('=== get Deal form config ===');
          this.getLeadFormConfig();
        },
        error => {
          console.log('Unable to retrieve Deal details');
        }

      );
  }

  getLeadFormConfig() {
    this.formService.getFields('form-deal-details').subscribe(
      data => {
        this.fields = data;
      },
      error => {
        console.log('Unable to retrieve Deal form information');
      }
    );
  }

  updateDealRecord() {
    this.dealService.save(this.dealModel)
      .subscribe(
        data => {
          console.log('Deal saved successfully.');
        },
        error => {
          console.log('Failed to update/save Deal details.');
        }
      );
  }

  edit() {
    this.options.formState.disabled = !this.options.formState.disabled;
  }

}
