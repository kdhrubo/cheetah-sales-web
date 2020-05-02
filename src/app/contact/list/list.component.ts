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

  fields = [
    {
      id: 1,
      name: 'id',
      label: 'Id',
      checked: false
    },

    {
      id: 2,
      name: 'firstName',
      label: 'First Name',
      checked: true,
      filter: {
          type: 'string',
          operator: '',
          operand: ''
        }
    },

    {
      id: 3,
      name: 'lastName',
      label: 'Last Name',
      checked: true
    },

    {
      id: 4,
      name: 'email',
      label: 'Email',
      checked: true
    },

    {
      id: 5,
      name: 'city',
      label: 'City',
      checked: true
    },

    {
      id: 6,
      name: 'country',
      label: 'Country',
      checked: true
    },

    {
      id: 7,
      name: 'company',
      label: 'Company',
      checked: true
    }
  ];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // console.log('Fields - ' + this.fields);
    this.search(this.rsql);
  }

  listLeadElement(value: string): void {
    console.log('Updating List Element count with new page size : ' + value);
    this.pageSize = +value;
    this.search(this.rsql);
  }

  loadNextPage(page: number): void {
    console.log('Loading next page with pageNo : ' + page);
    this.pageNo = page;
    this.search(this.rsql);
  }

  search(sql: string) {
    this.contactService.search(sql, this.pageNo - 1, this.pageSize ).subscribe(
      data => {
        this.contactPage = data;
        this.collectionSize = this.contactPage.totalElements;
        // console.log('Data - ' + JSON.stringify(data)) ;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  applyfilterSearch(): void {
    // console.log('fields - ' + JSON.stringify(this.fields));

    let sql = this.rsql ;

    for (const f of this.fields) {
      if (f.filter) {
        // tslint:disable-next-line: triple-equals
        if (f.filter.type == 'string') {
          const partial = ' and ' + f.name + f.filter.operator + f.filter.operand;
          sql = sql + partial;
        }
       }
    }

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
