import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Page } from '../../../models/page.model';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-deal-line-item',
  templateUrl: './deal-line-item.component.html',
  styleUrls: ['./deal-line-item.component.css']
})
export class DealLineItemComponent implements OnInit {

  rsql = 'deleted==false';

  productPage: Page<Product>;
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;


  fields = [

    {
      id: 3,
      name: 'productName',
      label: 'Product Name'
    },

    {
      id: 2,
      name: 'currency',
      label: 'Currency'
    },

    {
      id: 3,
      name: 'price',
      label: 'Price'
    },

  ];




  lineItemsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private productService: ProductService
    ) {
    this.lineItemsForm = this.fb.group({
      discount: null,
      priceBook: null,
      name: '',
      items: this.fb.array([]) ,
    });
  }

  ngOnInit() {}

  get items(): FormArray {
    return this.lineItemsForm.get('items') as FormArray;
  }

  newItem(): FormGroup {
    return this.fb.group({
      productId: '',
      productName: '',
      quantity: 0,
      listPrice: 0.00,
      discountPercentage: false,
      pctDiscount: 0,
      amtDiscount: 0,
      total: 0.00,
      netPrice: 0.00,
      note: null
    });
  }

  addItems() {
    this.items.push(this.newItem());
  }

  removeItem(i: number) {
    this.items.removeAt(i);
  }

  onSubmit() {
    console.log(this.lineItemsForm.value);
  }

  openLg(content) {
    this.search(this.rsql);
    this.modalService.open(content, { size: 'xl' });
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

  refresh(value: string): void {
    console.log('Updating List Element count with new page size : ' + value);
    this.pageSize = +value;
    this.search(this.rsql);
  }

  go2(page: number): void {
    console.log('Loading next page with pageNo : ' + page);
    this.pageNo = page;
    this.search(this.rsql);
  }

  add(product: Product) {
    // this.addProduct.emit(product);

  }


}
