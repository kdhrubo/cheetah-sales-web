import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page.model';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isCollapsed = true;
  isCollapsedFilter = true;

  contactPage: Page<Contact>;
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

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.search(this.rsql);
  }

  onSetSearchField(s: any) {
    this.searchField = s;
  }

  onSetOpField(op: any) {
    this.op = op;
  }

  doRefresh(value: string): void {
    this.pageSize = +value;
    this.search(this.rsql);
  }

  go2NextPage(page: number): void {
    this.pageNo = page;
    this.search(this.rsql);
  }

  search(sql: string) {
    this.contactService.search(sql, this.pageNo - 1, this.pageSize ).subscribe(
      data => {
        this.contactPage = data;
        this.collectionSize = this.contactPage.totalElements;
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

  delete(contact: Contact) {
    console.log('Delete - ' + contact.id);
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
    // console.log('Tracking Function');
    return this.trackCounter++;
  }

}
