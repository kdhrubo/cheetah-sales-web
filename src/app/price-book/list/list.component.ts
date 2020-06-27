import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page.model';
import { PriceBook } from '../../models/price-book.model';
import { PriceBookService } from '../../services/price-book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isCollapsed = true;
  isCollapsedFilter = true;
  priceBookPage: Page<PriceBook>;
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
      name: 'priceBookName',
      label: 'Price Book Name',
      checked: true,
      filter: {
        type: 'string',
        operator: '',
        operand: ''
      }
    },

    {
      id: 3,
      name: 'active',
      label: 'Active',
      checked: true
    },


    {
      id: 5,
      name: 'isStandard',
      label: 'Standard',
      checked: true
    },

    {
      id: 6,
      name: 'externalDataSrc',
      label: 'External Data Src',
      checked: true
    },

    {
      id: 7,
      name: 'externalId',
      label: 'External Id',
      checked: true
    }
  ];

  constructor(private priceBookService: PriceBookService) { }

  ngOnInit(): void {
    this.search(this.rsql);
  }

  search(sql: string) {
    this.priceBookService.search(sql, this.pageNo - 1, this.pageSize).subscribe(
      data => {
        this.priceBookPage = data;
        this.collectionSize = this.priceBookPage.totalElements;
        console.log('Data - ' + JSON.stringify(data));
      },
      error => console.log('Error - ' + error.message)
    );
  }

  delete(priceBook: PriceBook) {
    console.log('Delete - ' + priceBook);
  }

  listDealElement(value: string): void {
    console.log('Updating List Element count with new page size : ' + value);
    this.pageSize = +value;
    this.search(this.rsql);
  }

  loadNextPage(page: number): void {
    console.log('Loading next page with pageNo : ' + page);
    this.pageNo = page;
    this.search(this.rsql);
  }

  listPriceBookElement(value: string): void {
    console.log('Updating List Element count with new page size : ' + value);
    this.pageSize = +value;
    this.search(this.rsql);
  }

  applyfilterSearch(): void {
    let sql = this.rsql;
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

  toggleEditable(event: any): void {
    console.log('checked - ' + event.target.checked);
    console.log('value - ' + event.target.value);
    for (const i of this.fields) {
      if (i.id == event.target.value) {
        i.checked = !i.checked;
        this.trackFn();
        break;
      }
    }
  }

  trackFn(): number {
    return this.trackCounter++;
  }


}
