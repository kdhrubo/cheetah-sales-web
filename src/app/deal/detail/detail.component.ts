import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Deal } from 'src/app/models/deal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DealService } from 'src/app/services/deal.service';
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
  deal: Deal;
  id: any;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  fields: FormlyFieldConfig[];

  constructor(
    private route: ActivatedRoute,
    private dealService: DealService,
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
    this.dealService.findOne(this.id)
      .subscribe(
        data => {
          this.deal = data;
          this.getFormConfig();
        },
        error => {
          console.log('Unable to retrieve Deal details');
        }

      );
  }

  updateExt(inDeal: any) {
    this.deal = inDeal;
    this.onSubmit();
  }

  copy() {
    this.dealService.copy(this.deal.id).subscribe(
      (data) => {
        this.toastr.success('Deal Copied Successfully.', '', {});

        this.router.navigate(['/deals', data?.id]);
      },
      (error) => {
        this.toastr.error('Deal copy failed.', error?.detail, {});
      }
    );
  }

  getFormConfig() {
    this.formService.getFields('form-deal-details').subscribe(
      data => {
        this.fields = data;
      },
      error => {
        console.log('Unable to retrieve Deal form information');
      }
    );
  }

  onSubmit() {
    this.dealService.save(this.deal)
      .subscribe(
        data => {
          this.toastr.success('Deal saved successfully.', '', {});
        },
        error => {
          this.toastr.error('Lead save failed.', error?.detail, {});
        }
      );
  }

  confirmDelete(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  delete() {
    const ids = [this.id];
    this.dealService.delete(ids).subscribe(
      (data) => {
        this.toastr.success('Deal deleted successfully.', '', {});
        this.modalService.dismissAll();
        this.router.navigate(['/app/deals']);
      },
      (error) => {
        this.toastr.error('Deal delete failed.', error?.detail, {});
      }
    );

  }

}
