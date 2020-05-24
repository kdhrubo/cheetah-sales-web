import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from '../services/form.service';
import { TenantService } from '../services/tenant.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {
  tenant: any;
  id: any;
  form = new FormGroup({});

  fields: FormlyFieldConfig[] ;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  constructor(private formService: FormService, private tenantService: TenantService) { }

  ngOnInit(): void {
    this.getTenant();
    this.form.disable();
  }

  getTenant() {
    

    this.tenantService.findOne()
      .subscribe(
        data => {
          this.tenant = data;
          this.getFormConfig();
        },
        error => {
          console.log('Unable to retrieve Contact details');
        }

      );
  }

  getFormConfig() {
    this.formService.getFields('form-tenant-edit').subscribe(

      data => {
        this.fields = data;
      },

      error => {
        console.log('Unable to retrieve form information');
      }

    );
  }

}
