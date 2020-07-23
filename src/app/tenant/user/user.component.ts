import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Page } from '../../models/page.model';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'src/app/services/form.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userPage: Page<User>;
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;

  trackCounter = 1;

  rsql = 'deleted==false';

  searchField: string;
  searchText: string;
  op: string;

  model = {};
  form = new FormGroup({});

  formFields: FormlyFieldConfig[];

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
      name: 'firstName',
      label: 'First Name',
      checked: true,
      searchable: true
    },

    {
      id: 3,
      name: 'lastName',
      label: 'Last Name',
      checked: true,
      searchable: true
    },

    {
      id: 4,
      name: 'rolename',
      label: 'Role',
      checked: true,
      searchable: true
    },

    {
      id: 5,
      name: 'email',
      label: 'Email',
      checked: true,
      searchable: true
    }

  ];

  constructor(private userService: UserService,
              private modalService: NgbModal,
              private formService: FormService,
              private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.getFormConfig();
  }

  onSetSearchField(s: any) {
    this.searchField = s;
  }

  onSetOpField(op: any) {
    this.op = op;
  }

  openLg(content) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  getFormConfig() {
    this.formService.getFields('form-user-create').subscribe(
      (data) => {
        this.formFields = data;
        this.search(this.rsql);
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {
    const user: User = this.model as User;
    console.log('user - ' + JSON.stringify(user));
    this.userService.add(user).subscribe(
      (data) => {
        this.toastr.success('User added Successfully.', '', {});
        this.search(this.rsql);
        this.modalService.dismissAll();
      },
      (error) => {
        this.toastr.success('User addition failed.', '', {});
      }
    );
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
    this.userService.search(sql, this.pageNo - 1, this.pageSize ).subscribe(
      data => {
        this.userPage = data;
        this.collectionSize = this.userPage.totalElements;
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

  delete(user: User) {
    console.log('Delete - ' + user.id);
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
