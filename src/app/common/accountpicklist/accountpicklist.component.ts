import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../services/account.service';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-accountpicklist',
  templateUrl: './accountpicklist.component.html',
  styleUrls: ['./accountpicklist.component.css']
})
export class AccountpicklistComponent extends FieldType implements OnInit {

  accounts: Page<Account>;
  rsql = 'deleted==false';
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;

  val = '';

  accountId: string;
  account: Account;

  constructor(private modalService: NgbModal,
              private accountService: AccountService) {
    super();
  }

  ngOnInit(): void {
    console.log('### key - ' + this.field.key);
    console.log('### account id - ' + this.model[this.field.key]);
    this.accountId = this.model[this.field.key];
    if (this.accountId != null) {
      console.log('## get account details ');
      this.accountService.findOne(this.accountId).subscribe(
        data => {
          this.account = data;
          this.setField(this.account);
        },
        error => console.log('Error - ' + error.message)
      );
    }
    this.load();
  }

  load() {
    this.accountService.search(this.rsql, this.pageNo - 1, this.pageSize ).subscribe(
      data => {
        this.accounts = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  setField(a: Account) {
    console.log('a - ' + JSON.stringify(a));
    if ( a?.id != null ) {
      this.val = a?.name;
      this.formControl.setValue(a?.id);
    }
  }

}
