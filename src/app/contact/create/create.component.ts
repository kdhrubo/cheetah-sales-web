import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { FormService } from 'src/app/services/form.service';
import { PicklistService } from 'src/app/services/picklist.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model = {  };

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
    let contact: Contact = this.model as Contact;
    
    Object.keys(contact).forEach((key) => (contact[key] === null || contact[key] === '') && delete contact[key]);

    console.log('=== after clean up ====');
    console.log(JSON.stringify(contact));



    
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
