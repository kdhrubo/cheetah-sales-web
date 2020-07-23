import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Emails } from '../../models/emails.model';
import { Address } from '../../models/address.model';
import { Note } from 'src/app/models/note.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  contact: Contact;
  id: any;
  form = new FormGroup({});

  fields: FormlyFieldConfig[];

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private formService: FormService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params?.id;

      this.id = id;
      this.findOne(id);
    });
  }

  findOne(id: any) {

    this.contactService.findOne(this.id).subscribe(
      (data) => {
        this.contact = data;
        this.getFormConfig();
      },
      (error) => {
        console.log('Unable to retrieve Contact details');
      }
    );
  }

  updateExt(incontact: any) {
    this.contact = incontact;
    this.onSubmit();
  }

  copy() {
    this.contactService.copy(this.contact.id).subscribe(
      (data) => {
        this.toastr.success('Contact Copied Successfully.', '', {});

        this.router.navigate(['/contacts', data?.id]);
      },
      (error) => {
        this.toastr.error('Contact copy failed.', error?.detail, {});
      }
    );
  }

  getFormConfig() {
    this.formService.getFields('form-contact-edit').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  updatePrimaryAddress(address: Address) {
    this.contact.primaryAddress = address;
    this.onSubmit();
  }

  updateSecondaryAddress(address: Address) {
    this.contact.secondaryAddress = address;
    this.onSubmit();
  }




  addNote(note: Note) {
    this.contactService.addNote(this.id, note).subscribe(
      (data) => {
        this.contact = data;
      },
      (error) => {
        console.log('Error adding note.');
      }
    );
  }

  onSubmit() {
    this.contactService.save(this.contact).subscribe(
      (data) => {
        this.toastr.success('Contact saved successfully.', '', {});
      },
      (error) => {
        this.toastr.error('Contact save failed.', error?.detail, {});
      }
    );
  }
}
