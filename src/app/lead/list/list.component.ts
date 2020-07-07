import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page.model';
import { Lead } from '../../models/lead.model';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  leadPage: Page<Lead>;
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;

  trackCounter = 1;

  rsql = 'deleted==false';

  searchField = 'firstName';
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
      name: 'firstName',
      label: 'First Name',
      checked: true,
      searchable: true
    },

    {
      id: 3,
      name: 'lastName',
      label: 'Last Name',
      checked: true,
      searchable: true
    },

    {
      id: 4,
      name: 'email',
      label: 'Email',
      checked: true,
      searchable: true
    }

  ];

  constructor(private leadService: LeadService) {}

  ngOnInit(): void {
    this.search(this.rsql);
  }

  onSetSearchField(s: any) {
    this.searchField = s;
  }

  doRefresh(value: any): void {
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
    this.leadService.search(sql, this.pageNo - 1, this.pageSize ).subscribe(
      data => {
        this.leadPage = data;
        this.collectionSize = this.leadPage.totalElements;
        // console.log('Data - ' + JSON.stringify(data)) ;
      },
      error => console.log('Error - ' + error.message)
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

  delete(lead: Lead) {
    console.log('Delete - ' + lead.id);
  }

  toggleEditable(event: any): void {

    for (const i of this.fields) {
      // tslint:disable-next-line: triple-equals
      if (i.id == event.target.value) {
        // console.log('matched');
        i.checked = !i.checked;
        // console.log('calling track');
        this.trackFn();
        break;
      }
    }
  }

  trackFn(): number {
    return this.trackCounter++;
  }

}
