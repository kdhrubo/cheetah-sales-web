import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { AccountService } from 'src/app/services/account.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Account } from '../../models/account.model';
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
  fields: FormlyFieldConfig[];

  constructor(private accountService: AccountService,
              private formService: FormService,
              private toastr: ToastrService,
              private router: Router ) { }

  ngOnInit(): void {
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


  onSubmit() {
    const account: Account = this.model as Account;
    Object.keys(account).forEach((key) => (account[key] === null || account[key] === '') && delete account[key]);

    this.accountService.save(account)
      .subscribe(
        data => {
          this.toastr.success('Account Saved Successfully.', '', {});
          this.router.navigate(['/accounts' , data?.id]);
        },
        error => {
          console.log('Account save failure.');
        }
      );
  }


}
