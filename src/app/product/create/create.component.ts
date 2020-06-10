import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Product } from 'src/app/models/product.model';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form = new FormGroup({});
  model = { supportName: 'email@gmail.com' };
  fields: FormlyFieldConfig[];

  constructor(private productService: ProductService, private formService: FormService) { }

  ngOnInit(): void {
    this.fetchProductForm();
  }
  fetchProductForm(): void {
    this.formService.getFields('Product-form').subscribe(
      data => {
        this.fields = data;
        console.log('Retrieved product form information sucessfully.');
      },
      error => {
        console.log('Unable to retrieve product form information.');
      }
    );
  }

  saveProduct() {
    console.log(JSON.stringify(this.model));
    const product: Product = this.model as Product;
    Object.keys(product).forEach((key) => (product[key] === null || product[key] === '') && delete product[key]);
    console.log('=== After clean up product model ====');
    console.log(JSON.stringify(product));

    this.productService.save(product)
      .subscribe(
        data => {
          console.log('Product saved successfully:');
        },
        error => {
          console.log('Exception reported while saving product:');
        }
      );
  }

}
