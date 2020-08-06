import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { Page } from '../../models/page.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  categoryPage: Page<Category>;
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;
  trackCounter = 1;
  rsql = 'deleted==false';
  searchField: string;
  searchText: string;
  op: string;
  id: any;

  fields = [
    {
      id: 1,
      name: 'id',
      label: 'Id',
      checked: false,
      searchable: false
    },

    {
      id: 2,
      name: 'name',
      label: 'Name',
      checked: true,
      searchable: true
    },

    {
      id: 3,
      name: 'parent',
      label: 'Category',
      checked: true,
      searchable: true
    },

    {
      id: 4,
      name: 'phone',
      label: 'Description',
      checked: true,
      searchable: true
    },

    {
      id: 5,
      name: 'order',
      label: 'Order',
      checked: true,
      searchable: true
    },

  ];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.search(this.rsql);
  }

  onSetSearchField(s: any) {
    this.searchField = s;
  }

  onSetOpField(op: any) {
    this.op = op;
  }

  doRefresh(value: any): void {
    this.pageSize = +value;
    this.search(this.rsql);
  }


  go2NextPage(page: number): void {
    this.pageNo = page;
    this.search(this.rsql);
  }

  search(sql: string) {
    this.categoryService.search(sql, this.pageNo - 1, this.pageSize ).subscribe(
      data => {
        this.categoryPage = data;
        this.collectionSize = this.categoryPage.totalElements;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  doSearch(): void {
    this.pageNo = 1;
    this.pageSize = 10;
    let sql = `deleted==false`;

    if (this.op) {
      sql = `deleted==false;${this.searchField}${this.op}${this.searchText}`;
    }
    this.rsql = sql;
    this.search(sql);


  }


  delete() {
    const ids = [this.id];
    this.categoryService.delete(ids).subscribe(
      (data) => {
        this.toastr.success('Category deleted successfully.', '', {});
        this.modalService.dismissAll();
        this.router.navigate(['/app/categories/list']);
      },
      (error) => {
        this.toastr.error('Category delete failed.', error?.detail, {});
      }
    );

  }

  toggleEditable(event: any): void {

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
