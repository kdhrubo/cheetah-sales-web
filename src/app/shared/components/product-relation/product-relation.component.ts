import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbDatepickerContent } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product.service';
import { Page } from '../../../models/page.model';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-relation',
  templateUrl: './product-relation.component.html',
  styleUrls: ['./product-relation.component.css']
})
export class ProductRelationComponent implements OnInit {

  rsql = 'deleted==false';

  productPage: Page<Product>;
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;


  fields = [

    {
      id: 3,
      name: 'name',
      label: 'Product Name'
    },

    {
      id: 2,
      name: 'currency',
      label: 'Currency'
    },

    {
      id: 3,
      name: 'unitPrice',
      label: 'Price'
    },

  ];

  @Input() products: Product[];
  @Output() addProduct = new EventEmitter<object>();
  @Output() removeProduct = new EventEmitter<object>();

  constructor(private modalService: NgbModal,
              private productService: ProductService
    ) { }

  ngOnInit(): void {}


  search(sql: string) {
    this.productService.search(sql, this.pageNo - 1, this.pageSize).subscribe(
      data => {
        this.productPage = data;
        this.collectionSize = this.productPage.totalElements;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  add(product: Product) {
    this.addProduct.emit(product);

  }

  remove(product: any) {
    console.log('product - ' + JSON.stringify(product));
    this.removeProduct.emit(product);
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

  openLg(content) {
    this.search(this.rsql);
    this.modalService.open(content, { size: 'xl' });
  }

}
