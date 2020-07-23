import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page.model';
import { Deal } from 'src/app/models/deal.model';
import { DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dealPage: Page<Deal>;
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;
  trackCounter = 1;
  rsql = 'deleted==false';

  searchField: string;
  searchText: string;
  op: string;

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
      name: 'amount',
      label: 'Amount',
      checked: true,
      searchable: true
    },


    {
      id: 5,
      name: 'contactId',
      label: 'Contact',
      checked: true,
      searchable: false
    },

    {
      id: 6,
      name: 'accountId',
      label: 'Account',
      checked: true,
      searchable: false
    },

    {
      id: 7,
      name: 'expectedClose',
      label: 'Expected Close',
      checked: true,
      searchable: false
    }
  ];

  constructor(private dealService: DealService) { }

  ngOnInit(): void {
    this.search(this.rsql);
  }

  onSetSearchField(s: any) {
    this.searchField = s;
  }

  onSetOpField(op: any) {
    this.op = op;
  }

  doRefresh(value: any): void {
    this.pageSize = +value;
    this.search(this.rsql);
  }


  go2NextPage(page: number): void {
    this.pageNo = page;
    this.search(this.rsql);
  }

  search(sql: string) {
    this.dealService.search(sql, this.pageNo - 1, this.pageSize).subscribe(
      data => {
        this.dealPage = data;
        this.collectionSize = this.dealPage.totalElements;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  doSearch(): void {
    this.pageNo = 1;
    this.pageSize = 10;
    let sql = `deleted==false`;

    if (this.op) {
      sql = `deleted==false;${this.searchField}${this.op}${this.searchText}`;
    }
    this.rsql = sql;
    this.search(sql);
  }

  delete(deal: Deal) {
    console.log('Delete - ' + deal.id);
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
