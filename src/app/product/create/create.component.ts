import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Product } from 'src/app/models/product.model';
import { FormService } from 'src/app/services/form.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form = new FormGroup({});
  model = {  };
  fields: FormlyFieldConfig[];

  constructor(private productService: ProductService,
              private formService: FormService,
              private toastr: ToastrService,
              private router: Router) {}

  ngOnInit(): void {
    this.formService.getFields('form-product-create').subscribe(

      data => {
        this.fields = data;
        console.log('Retrieved lead form information sucessfully.');
      },
      error => {
        console.log('Unable to retrieve lead form information.');
      }

    );
  }


  onSubmit() {
    const product: Product = this.model as Product;
    Object.keys(product).forEach((key) => (product[key] === null || product[key] === '') && delete product[key]);

    this.productService.save(product)
      .subscribe(
        data => {
          this.toastr.success('Product Saved Successfully.', '', {});
          this.router.navigate(['/app/products' , data?.id]);
        },
        error => {
          this.toastr.error('Product save failed.', error?.detail, {});
        }
      );
  }

}
