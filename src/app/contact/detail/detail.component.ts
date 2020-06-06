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
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.id = this.route.snapshot.paramMap.get('id');

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

  addAddress(address: Address) {
    console.log('Address ->>> ' + JSON.stringify(address));

    this.contactService.addAddress(this.id, address).subscribe(
      (data) => {
        this.contact = data;
      },
      (error) => {
        console.log('Error adding  address.');
      }
    );
  }

  addEmail(emails: Emails) {
    console.log('Email address ->>> ' + JSON.stringify(emails));

    this.contactService.addEmails(this.id, emails).subscribe(
      (data) => {
        this.contact = data;
      },
      (error) => {
        console.log('Error adding email address.');
      }
    );
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
        console.log('Contact save success');
      },
      (error) => {
        console.log('Contact save failure');
      }
    );
  }
}
