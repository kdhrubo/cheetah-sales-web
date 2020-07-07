import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page.model';
import { Account } from '../../models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  accountPage: Page<Account>;
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;
  trackCounter = 1;
  rsql = 'deleted==false';

  searchField = 'name';
  searchText = '';

  fields = [
    {
      id: 1,
      name: 'id',
      label: 'Id',
      checked: false,
      searchable: false
    },

    {
      id: 2,
      name: 'name',
      label: 'Name',
      checked: true,
      searchable: true
    },

    {
      id: 3,
      name: 'website',
      label: 'Website',
      checked: true,
      searchable: false
    },

    {
      id: 4,
      name: 'phone',
      label: 'Phone',
      checked: true,
      searchable: true
    },

    {
      id: 5,
      name: 'email',
      label: 'Email',
      checked: true,
      searchable: true
    },

    {
      id: 6,
      name: 'fax',
      label: 'Fax',
      checked: true,
      searchable: false
    },

    {
      id: 7,
      name: 'annualRevenue',
      label: 'AnnualRevenue',
      checked: true,
      searchable: false
    }
  ];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.search(this.rsql);
  }

  onSetSearchField(s: any) {
    this.searchField = s;
  }

  doRefresh(value: string): void {
    console.log('Updating List Element count with new page size : ' + value);
    this.pageSize = +value;
    this.search(this.rsql);
  }

  go2NextPage(page: number): void {
    console.log('Loading next page with pageNo : ' + page);
    this.pageNo = page;
    this.search(this.rsql);
  }

  search(sql: string) {
    this.accountService.search(sql, this.pageNo - 1, this.pageSize).subscribe(
      data => {
        this.accountPage = data;
        this.collectionSize = this.accountPage.totalElements;
      },
      error => console.log('Error while loading Account - ' + error.message)
    );
  }

  doSearch(): void {
    this.pageNo = 1;
    this.pageSize = 10;
    let sql = `deleted==false`;
    if( this.searchText ) {
      sql = `deleted==false;${this.searchField}==${this.searchText}`;
    }

    this.rsql = sql;

    this.search(sql);

  }

  delete(account: Account) {
    console.log('Delete - ' + account);
  }


  toggleEditable(event: any): void {
    console.log('checked - ' + event.target.checked);
    console.log('value - ' + event.target.value);

    for (const i of this.fields) {
      // tslint:disable-next-line: triple-equals
      if (i.id == event.target.value) {
        // console.log('matched');
        i.checked = !i.checked;
        // console.log('calling track');
        this.trackFn();

        // console.log('Call API');
        // this.callApi();
        break;
      }
    }
  }

  trackFn(): number {
    return this.trackCounter++;
  }

}
