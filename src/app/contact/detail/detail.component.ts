import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  contact: Contact;
  id: any;
  form = new FormGroup({});
  active = 1;

  fields: FormlyFieldConfig[] ;

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService,
              private formService: FormService) { }

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.contactService.findOne(this.id)
      .subscribe(
        data => {
          this.contact = data;
          console.log('# contact - ', JSON.stringify(this.contact));
          console.log('=== get form config ===');
          this.getFormConfig();
        },
        error => {
          console.log('Unable to retrieve Contact details');
        }

      );
  }

  getFormConfig() {
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
    this.contactService.save(this.contact)
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
