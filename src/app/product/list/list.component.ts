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

  productPage: Page<Product>;
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
      name: 'currency',
      label: 'Currency',
      checked: true,
      searchable: true
    },

    {
      id: 3,
      name: 'productName',
      label: 'Product Name',
      checked: true,
      searchable: true
    },

    {
      id: 4,
      name: 'manufacturerName',
      label: 'Manufacturer Name',
      checked: true,
      searchable: true
    },

    {
      id: 5,
      name: 'vendorName',
      label: 'Vendor Name',
      checked: true,
      searchable: true
    },

    {
      id: 6,
      name: 'salesStartDate',
      label: 'Date',
      checked: true,
      searchable: false
    },

    {
      id: 7,
      name: 'salesEndDate',
      label: 'Date',
      checked: true,
      searchable: false
    }
  ];

  constructor(private productService: ProductService) { }

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
    this.productService.search(sql, this.pageNo - 1, this.pageSize).subscribe(
      data => {
        this.productPage = data;
        this.collectionSize = this.productPage.totalElements;
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

  delete(product: Product) {
    console.log('Delete - ' + product);
  }

  toggleEditable(event: any): void {
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
