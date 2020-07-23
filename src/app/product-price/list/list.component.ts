import { Component, OnInit } from '@angular/core';
import { Page } from '../../models/page.model';
import { ProductPrice } from '../../models/product-price/product-price.model';
import { ProductPriceService } from '../../services/product-price.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isCollapsed = true;
  isCollapsedFilter = true;
  productPricePage: Page<ProductPrice>;
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
      name: 'active',
      label: 'Active',
      checked: true
    },

    {
      id: 3,
      name: 'listPrice',
      label: 'List Price',
      checked: true,
      filter: {
        type: 'string',
        operator: '',
        operand: ''
      }
    },
    {
      id: 4,
      name: 'currency',
      label: 'currency Id',
      checked: true,
      filter: {
        type: 'string',
        operator: '',
        operand: ''
      }
    },

    {
      id: 5,
      name: 'priceBook',
      label: 'Price Book Id',
      checked: true,
      filter: {
        type: 'string',
        operator: '',
        operand: ''
      }
    },

    {
      id: 6,
      name: 'Product',
      label: 'Product Id',
      checked: true,
      filter: {
        type: 'string',
        operator: '',
        operand: ''
      }
    },

    {
      id: 7,
      name: 'standardPrice',
      label: 'standardPrice',
      checked: true,
      filter: {
        type: 'number',
        operator: '',
        operand: ''
      }
    },

    {
      id: 8,
      name: 'useStandardPrice',
      label: 'StandardPrice',
      checked: true
    }
  ];

  constructor(private productPriceService: ProductPriceService) { }

  ngOnInit(): void {
    this.search(this.rsql);
  }

  search(sql: string) {
    this.productPriceService.search(sql, this.pageNo - 1, this.pageSize).subscribe(
      data => {
        this.productPricePage = data;
        this.collectionSize = this.productPricePage.totalElements;
        console.log('Data - ' + JSON.stringify(data));
      },
      error => console.log('Error - ' + error.message)
    );
  }

  delete(productPrice: ProductPrice) {
    console.log('Delete - ' + productPrice);
  }

  listProductPriceElement(value: string): void {
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
