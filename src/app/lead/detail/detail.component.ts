import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/services/lead.service';
import { Lead } from 'src/app/models/lead.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  form = new FormGroup({});
  lead: Lead;
  id: any;

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[];

  convertLeadModel = {id: ''};
  convertfields: FormlyFieldConfig[];

  constructor(
    private route: ActivatedRoute,
    private leadService: LeadService,
    private formService: FormService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params?.id;

      this.id = id;
      this.findOne(id);
    });
  }

  findOne(id: any) {
    this.leadService.findOne(id).subscribe(
      (data) => {
        this.lead = data;
        this.getFormConfig();
      },
      (error) => {
        console.log('Unable to retrieve lead details');
      }
    );
  }

  updateExt(inlead: any) {
    this.lead = inlead;
    this.onSubmit();
  }

  copy() {
    this.leadService.copy(this.lead.id).subscribe(
      (data) => {
        this.toastr.success('Lead Copied Successfully.', '', {});

        this.router.navigate(['/leads', data?.id]);
      },
      (error) => {
        this.toastr.error('Lead copy failed.', error?.detail, {});
      }
    );
  }

  startConvert(content: any) {

    this.formService.getFields('form-lead-convert').subscribe(
      (data) => {
        this.convertfields = data;
        this.modalService.open(content, { size: 'xl', centered: true });
      },
      (error) => {
        console.log('Unable to retrieve lead convert form information');
      }
    );
  }

  submitConvert() {
    console.log('complete convert - trying to load modal - ' + JSON.stringify(this.convertLeadModel));
    console.log('complete convert - trying to load modal - ' + this.id);

    this.convertLeadModel.id = this.id;

    this.leadService.convert(this.convertLeadModel).subscribe(
      (data) => {
        this.toastr.success('Lead converted successfully.', '', {});
      },
      (error) => {
        this.toastr.error('Lead conversion failed.', error?.detail, {});
      }
    );

  }

  updatePrimaryAddress(address: Address) {
    this.lead.primaryAddress = address;
    this.onSubmit();
  }

  updateSecondaryAddress(address: Address) {
    this.lead.secondaryAddress = address;
    this.onSubmit();
  }

  getFormConfig() {
    this.formService.getFields('form-lead-detail').subscribe(
      (data) => {
        this.fields = data;
      },
      (error) => {
        this.toastr.error('Unable to retrieve lead form information', error?.detail, {});
      }
    );
  }

  onSubmit() {
    this.leadService.save(this.lead).subscribe(
      (data) => {
        this.toastr.success('Lead saved successfully.', '', {});
      },
      (error) => {
        this.toastr.error('Lead save failed.', error?.detail, {});
      }
    );
  }

  addProduct(product: any){

    const p = {
      id: product.id,
      name: product.productName
    };

    this.leadService.addProduct(this.id, p).subscribe(
      (data) => {
        this.lead = data;
        this.toastr.success('Product added successfully.', '', {});
      },
      (error) => {
        this.toastr.error('Failed to add product to lead.', error?.detail, {});
      }
    );

  }

  removeProduct(product: any){
    this.leadService.removeProduct(this.id, product.id).subscribe(
      (data) => {
        this.lead = data;
        this.toastr.success('Product removed successfully.', '', {});
      },
      (error) => {
        this.toastr.error('Failed to removed product from lead.', error?.detail, {});
      }
    );


  }
}
