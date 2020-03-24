import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormArray, FormGroup } from '@angular/forms';

export interface TabType {
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  contact: Contact;
  id: any;


  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  tabs: TabType[] = [
    {
      label: 'Personal data',
      fields: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-4',
              type: 'select',
              key: 'salutation',
              templateOptions: {
                label: 'Salutation',
                options: [
                  {label: 'X', value: 'X'},
                  {label: 'X', value: 'X'},
                  {label: 'X', value: 'X'},
                  {label: 'X', value: 'X'},
                  {label: 'X', value: 'X'}
    
                ]
              },
              expressionProperties: {
               // apply expressionProperty for disabled based on formState
              'templateOptions.disabled': 'formState.disabled',
              }
            },
            {
              className: 'col-4',
              type: 'input',
              key: 'firstName',
              templateOptions: {
                label: 'First Name',
              },
              expressionProperties: {
               // apply expressionProperty for disabled based on formState
              'templateOptions.disabled': 'formState.disabled',
              }
            },
            {
              className: 'col-4',
              type: 'input',
              key: 'lastName',
              templateOptions: {
                label: 'Last Name',
                required: true,
                class: 'form-control form-control-sm'
              }
              ,
              expressionProperties: {
               // apply expressionProperty for disabled based on formState
              'templateOptions.disabled': 'formState.disabled',
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Destination',
      fields: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-4',
              type: 'input',
              key: 'designation',
              templateOptions: {
                label: 'Designation',
              }
            },
            {
              className: 'col-4',
              type: 'input',
              key: 'company',
              templateOptions: {
                label: 'Company',
              },
            },
            {
              className: 'col-4',
              type: 'input',
              key: 'noOfEmployees',
              templateOptions: {
                label: '# of Employees',
              }
            }
          ]
        }



      ]
    },
    {
      label: 'Day of the trip',
      fields: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'col-4',
              type: 'input',
              key: 'email',
              templateOptions: {
                label: 'Email',
              }
            },
            {
              className: 'col-4',
              type: 'input',
              key: 'phone',
              templateOptions: {
                label: 'Phone',
              }
            },
            {
              className: 'col-4',
              type: 'input',
              key: 'mobile',
              templateOptions: {
                label: 'Mobile',
              }
            }
          ]
        }
      ]
    },
  ];
  form = new FormArray(this.tabs.map(() => new FormGroup({})));
  // options = this.tabs.map(() => {} as FormlyFormOptions);


  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.contactService.findOne(this.id)
      .subscribe(
        data => {
          this.contact = data;
        },
        error => {
          console.log('Unable to retrieve Contact details');
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
