import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };

  fields: FormlyFieldConfig[] ;

  constructor(private contactService: ContactService, private formService: FormService) { }

  ngOnInit(): void {
    this.formService.getFields('contact-form').subscribe(

      data => {
        this.fields = data;
      },

      error => {
        console.log('Unable to retrieve form information');
      }

    );

  }

  onSubmit() {
    console.log(JSON.stringify(this.model));
    const contact: Contact = this.model as Contact;
    this.contactService.save(contact)
    .subscribe(
      data => {
        console.log('Contact save success');
      },
      error => {
        console.log('Contact save failure');
      }
    );
  }

}
