import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { AccountService } from 'src/app/services/account.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[];

  constructor(private accountService: AccountService, private formService: FormService) { }

  ngOnInit(): void {
    this.fetchAccountCreateForm();
  }

  fetchAccountCreateForm(): void {
    this.formService.getFields('form-account-create').subscribe(
      data => {
        this.fields = data;
        console.log('Retrieved account form information sucessfully.');
      },
      error => {
        console.log('Unable to retrieve account form information.');
      }
    );
  }

  saveAccount() {
    console.log(JSON.stringify(this.model));
    const account: Account = this.model as Account;
    Object.keys(account).forEach((key) => (account[key] === null || account[key] === '') && delete account[key]);
    console.log('=== After clean up account model ====');
    console.log(JSON.stringify(account));

    this.accountService.save(account)
      .subscribe(
        data => {
          console.log('Account saved successfully:');
        },
        error => {
          console.log('Exception reported while saving Account:');
        }
      );
  }


}
