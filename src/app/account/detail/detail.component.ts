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
  account: Account;
  id: any;
  active = 1;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private formService: FormService) { }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.accountService.findOne(this.id)
      .subscribe(
        data => {
          this.account = data;
          this.getAccountFormConfig();
        },
        error => {
          console.log('Unable to retrieve Account details');
        }

      );
  }

  getAccountFormConfig() {
    this.formService.getFields('form-account-detail').subscribe(
      data => {
        this.fields = data;
      },
      error => {
        console.log('Unable to Account  form information');
      }
    );
  }

  onSubmit() {
    this.accountService.save(this.account)
      .subscribe(
        data => {
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
