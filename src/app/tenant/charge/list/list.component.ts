import { Component, OnInit } from '@angular/core';
import { Charge } from 'src/app/models/charge/charge.model';
import { Page } from 'src/app/models/page.model';
import { ChargeService } from 'src/app/services/charge.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  chargePage: Page<Charge>;
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
      name: 'chargeValue',
      label: 'Charge Value',
      checked: true,
      searchable: true
    },

    {
      id: 3,
      name: 'isTaxable',
      label: 'isTaxable',
      checked: true,
      searchable: true
    },

  ];

  constructor(private chargeService: ChargeService) { }

  ngOnInit(): void {
    this.search(this.rsql);
  }

  search(sql: string) {
    this.chargeService.search(sql, this.pageNo - 1, this.pageSize).subscribe(
      data => {
        this.chargePage = data;
        this.collectionSize = this.chargePage.totalElements;
      },
      error => console.log('Error - ' + error.message)
    );
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

  delete(charge: Charge) {
    console.log('Delete - ' + charge.id);
  }

  trackFn(): number {
    return this.trackCounter++;
  }

}
