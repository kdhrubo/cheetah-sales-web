import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isCollapsed = true;
  isCollapsedFilter = true;
  productPage: Page<Product>;
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
      name: 'currency',
      label: 'Currency',
      checked: true,
      filter: {
        type: 'string',
        operator: '',
        operand: ''
      }
    },

    {
      id: 3,
      name: 'productName',
      label: 'Product Name',
      checked: true
    },

    {
      id: 4,
      name: 'manufacturerName',
      label: 'Manufacturer Name',
      checked: true
    },

    {
      id: 5,
      name: 'vendorName',
      label: 'Vendor Name',
      checked: true
    },

    {
      id: 6,
      name: 'salesStartDate',
      label: 'Date',
      checked: true
    },

    {
      id: 7,
      name: 'salesEndDate',
      label: 'Date',
      checked: true
    }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.search(this.rsql);
  }

  search(sql: string) {
    this.productService.search(sql, this.pageNo - 1, this.pageSize).subscribe(
      data => {
        this.productPage = data;
        this.collectionSize = this.productPage.totalElements;
        console.log('Data - ' + JSON.stringify(data));
      },
      error => console.log('Error - ' + error.message)
    );
  }

  delete(product: Product) {
    console.log('Delete - ' + product);
  }

  listProductElement(value: string): void {
    console.log('Updating List Element count with new page size : ' + value);
    this.pageSize = +value;
    this.search(this.rsql);
  }

  loadNextPage(page: number): void {
    console.log('Loading next page with pageNo : ' + page);
    this.pageNo = page;
    this.search(this.rsql);
  }

  applyfilterSearch(): void {
    // console.log('fields - ' + JSON.stringify(this.fields));
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
