import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  form = new FormGroup({});
  product: Product;
  id: any;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formService: FormService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params?.id;

      this.id = id;
      this.findOne(id);
    });
  }

  findOne(id: any) {
    this.productService.findOne(this.id)
      .subscribe(
        data => {
          this.product = data;
          this.getFormConfig();
        },
        error => {
          console.log('Unable to retrieve Product details');
        }

      );
  }


  confirmDelete(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  delete() {
  }

  getFormConfig() {
    this.formService.getFields('form-product-detail').subscribe(
      data => {
        this.fields = data;
      },
      error => {
        console.log('Unable to retrieve product form information');
      }
    );
  }

  onSubmit() {
    this.productService.save(this.product)
      .subscribe(
        data => {
          this.toastr.success('Product updated/saved successfully.', '', {});
        },
        error => {
          this.toastr.error('Product save failed.', error?.detail, {});
        }
      );
  }

  edit() {
    this.options.formState.disabled = !this.options.formState.disabled;
  }

  updateExt(inProduct: any) {
    this.product = inProduct;
    this.onSubmit();
  }

  copy() {
    this.productService.copy(this.product.id).subscribe(
      (data) => {
        this.toastr.success('Product Copied Successfully.', '', {});

        this.router.navigate(['/products/detail', data?.id]);
      },
      (error) => {
        this.toastr.error('Product copy failed.', error?.detail, {});
      }
    );
  }



}
