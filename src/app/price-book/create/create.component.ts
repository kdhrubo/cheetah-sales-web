import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { PriceBookService } from '../../services/price-book.service';
import { PriceBook } from '../../models/price-book.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[];

  constructor(private priceBookService: PriceBookService,
    private formService: FormService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.formService.getFields('form-price-book').subscribe(
      data => {
        this.fields = data;
        console.log('Retrieved price book form information sucessfully.');
      },
      error => {
        console.log('Unable to retrieve price book form information.');
      }
    );
  }

  onSubmit() {
    const priceBook: PriceBook = this.model as PriceBook;
    Object.keys(priceBook).forEach((key) => (priceBook[key] === null || priceBook[key] === '') && delete priceBook[key]);
    console.log(JSON.stringify(priceBook));

    this.priceBookService.save(priceBook)
      .subscribe(
        data => {
          this.toastr.success('Price-Book Saved Successfully.', '', {});
          this.router.navigate(['/app/pricebooks', data?.id]);
        },
        error => {
          console.log('Price-Book save failure.');
        }
      );
  }

}
