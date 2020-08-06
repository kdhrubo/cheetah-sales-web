import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormService } from 'src/app/services/form.service';
import { Category } from '../../models/category.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form = new FormGroup({});
  model = { name: '' };
  fields: FormlyFieldConfig[];

  constructor(private categorytService: CategoryService, 
              private formService: FormService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchCategoryCreateForm();

  }

  fetchCategoryCreateForm(): void {
    this.formService.getFields('Category-form').subscribe(
      data => {
        this.fields = data;
        console.log('Retrieved Category form information sucessfully.');
      },
      error => {
        console.log('Unable to retrieve Category form information.');
      }
    );
  }

  saveCategory() {
    console.log(JSON.stringify(this.model));
    const category: Category = this.model as Category;
    Object.keys(category).forEach((key) => (category[key] === null || category[key] === '') && delete category[key]);
    console.log('=== After clean up category model ====');
    console.log(JSON.stringify(category));

    this.categorytService.save(category)
      .subscribe(
        data => {
          this.toastr.success('Category Saved Successfully.', '', {});
          this.router.navigate(['/app/categories' , data?.id]);
        },
        error => {
          this.toastr.error('Category save failed.', error?.detail, {});
        }
      );
  }

}
