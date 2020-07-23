import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { Page } from '../../models/page.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isCollapsed = true;
  isCollapsedFilter = true;
  categoryPage: Page<Category>;
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
      name: 'name',
      label: 'Name',
      checked: true,
      filter: {
        type: 'string',
        operator: '',
        operand: ''
      }
    },

    {
      id: 3,
      name: 'parent',
      label: 'Category',
      checked: true
    },

    {
      id: 4,
      name: 'phone',
      label: 'description',
      checked: true
    },

    {
      id: 5,
      name: 'order',
      label: 'Order',
      checked: true
    },

  ];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.search(this.rsql);
  }

  search(sql: string) {
    this.categoryService.search(sql, this.pageNo - 1, this.pageSize).subscribe(
      data => {
        this.categoryPage = data;
        this.collectionSize = this.categoryPage.totalElements;
        console.log('Data - ' + JSON.stringify(data));
      },
      error => console.log('Error while loading Category - ' + error.message)
    );
  }

  delete(category: Category) {
    console.log('Delete - ' + category);
  }

  listDealElement(value: string): void {
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
    // console.log('fields - ' + JSON.stringify(this.fields));
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
      // tslint:disable-next-line: triple-equals
      if (i.id == event.target.value) {
        // console.log('matched');
        i.checked = !i.checked;
        // console.log('calling track');
        this.trackFn();
        break;
      }
    }
  }

  trackFn(): number {
    return this.trackCounter++;
  }


}
