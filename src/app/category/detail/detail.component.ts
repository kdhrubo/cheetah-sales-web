import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  form = new FormGroup({});
  categoryModel: Category;
  id: any;
  active = 1;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[];

  constructor(private route: ActivatedRoute, private router: Router,
    private categoryService: CategoryService, private formService: FormService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.findOne(this.id)
      .subscribe(
        data => {
          this.categoryModel = data;
          console.log('# Category - ', JSON.stringify(this.categoryModel));
          console.log('=== get Category form config ===');
          this.getAccountFormConfig();
        },
        error => {
          console.log('Unable to retrieve Account details');
        }

      );
  }

  getAccountFormConfig() {
    this.formService.getFields('Category-form').subscribe(
      data => {
        this.fields = data;
      },
      error => {
        console.log('Unable to retrieve Category form information');
      }
    );
  }

  updateCategoryRecord() {
    this.categoryService.save(this.categoryModel)
      .subscribe(
        data => {
          console.log('Category updated successfully.');
          console.log('Navigating to list page now....');
          this.router.navigate(['categories/list']);
        },
        error => {
          console.log('Failed to update/save Category details.');
        }
      );
  }

  edit() {
    this.options.formState.disabled = !this.options.formState.disabled;
  }

  cancel() {
    this.router.navigate(['categories/list']);

  }

}
