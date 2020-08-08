import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PriceBook } from 'src/app/models/price-book.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { PriceBookService } from '../../services/price-book.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  form = new FormGroup({});
  priceBook: PriceBook;
  id: any;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[];

  constructor(private route: ActivatedRoute,
    private priceBookService: PriceBookService,
    private formService: FormService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params?.id;
      this.id = id;
      this.findOne(id);
    });
  }

  findOne(id: any) {
    this.priceBookService.findOne(this.id)
      .subscribe(
        data => {
          this.priceBook = data;
          this.getFormConfig();
        },
        error => {
          console.log('Unable to retrieve Price Book details');
        }

      );
  }

  getFormConfig() {
    this.formService.getFields('form-price-book').subscribe(
      data => {
        this.fields = data;
      },
      error => {
        console.log('Unable to retrieve Price book form information');
      }
    );
  }

  onSubmit() {
    this.priceBookService.save(this.priceBook)
      .subscribe(
        data => {
          this.toastr.success('PriceBook updated/saved successfully.', '', {});
        },
        error => {
          this.toastr.error('PriceBook save failed.', error?.detail, {});
        }
      );
  }

  edit() {
    this.options.formState.disabled = !this.options.formState.disabled;
  }

  updateExt(inPriceBook: any) {
    this.priceBook = inPriceBook;
    this.onSubmit();
  }

  copy() {
    this.priceBookService.copy(this.priceBook.id).subscribe(
      (data) => {
        this.toastr.success('PriceBook Copied Successfully.', '', {});

        this.router.navigate(['/pricebooks/detail', data?.id]);
      },
      (error) => {
        this.toastr.error('Pricebooks copy failed.', error?.detail, {});
      }
    );
  }

  addProduct(product: any) {

    const p = {
      id: product.id,
      productName: product.name
    };
     

    this.priceBookService.addProduct(this.id, p).subscribe(
      (data) => {
        this.priceBook = data;
        this.toastr.success('Product added successfully in priceBook.', '', {});
      },
      (error) => {
        this.toastr.error('Failed to add product to priceBook.', error?.detail, {});
      }
    );
  }

  removeProduct(product: any) {
    this.priceBookService.removeProduct(this.id, product.id).subscribe(
      (data) => {
        this.priceBook = data;
        this.toastr.success('Product removed successfully.', '', {});
      },
      (error) => {
        this.toastr.error('Failed to removed product from priceBook.', error?.detail, {});
      }
    );
  }

}
