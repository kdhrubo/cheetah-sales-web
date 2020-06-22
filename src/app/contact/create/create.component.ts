import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { FormService } from '../../services/form.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model = {  };

  fields: FormlyFieldConfig[] ;

  constructor(private contactService: ContactService,
              private formService: FormService,
              private toastr: ToastrService,
              private router: Router ) { }

  ngOnInit(): void {
    this.formService.getFields('form-contact-create').subscribe(

      data => {
        this.fields = data;
      },

      error => {
        console.log('Unable to retrieve form information');
      }

    );

  }

  onSubmit() {
    const contact: Contact = this.model as Contact;
    Object.keys(contact).forEach((key) => (contact[key] === null || contact[key] === '') && delete contact[key]);

    this.contactService.save(contact)
    .subscribe(
      data => {
        this.toastr.success('Contact Saved Successfully.', '', {});
        this.router.navigate(['/contacts' , data?.id]);
      },
      error => {
        console.log('Contact save failure');
      }
    );
  }

}
