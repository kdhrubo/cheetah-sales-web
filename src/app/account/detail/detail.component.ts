import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from '../../models/account.model';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  form = new FormGroup({});
  accountModel: Account;
  id: any;
  active = 1;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[];

  constructor(private route: ActivatedRoute, private router: Router,
    private accountService: AccountService, private formService: FormService) { }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.accountService.findOne(this.id)
      .subscribe(
        data => {
          this.accountModel = data;
          console.log('# account - ', JSON.stringify(this.accountModel));
          console.log('=== get Account form config ===');
          this.getAccountFormConfig();
        },
        error => {
          console.log('Unable to retrieve Account details');
        }

      );
  }

  getAccountFormConfig() {
    this.formService.getFields('form-account-create').subscribe(
      data => {
        this.fields = data;
      },
      error => {
        console.log('Unable to Account  form information');
      }
    );
  }

  updateAccountRecord() {
    this.accountService.save(this.accountModel)
      .subscribe(
        data => {
          console.log('Account updated successfully.');
          console.log('Navigating to list page now....');
          this.router.navigate(['accounts/list']);
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
