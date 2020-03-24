import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };

  fields: FormlyFieldConfig[] = [
    {
      className: 'section-label',
      template: '<div><strong>Basic Information:</strong></div>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-md-4 col-sm-6',
          type: 'select',
          key: 'salutation.id',
          templateOptions: {
            label: 'Salutation',
            options: [
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'}

            ]
          }
        },
        {
          className: 'col-md-4 col-sm-6',
          type: 'input',
          key: 'firstName',
          templateOptions: {
            label: 'First Name',
          },
        },
        {
          className: 'col-md-4 col-sm-6',
          type: 'input',
          key: 'lastName',
          templateOptions: {
            label: 'Last Name',
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-md-4 col-sm-6',
          type: 'input',
          key: 'designation',
          templateOptions: {
            label: 'Designation',
          }
        },
        {
          className: 'col-md-4 col-sm-6',
          type: 'input',
          key: 'company',
          templateOptions: {
            label: 'Company',
          },
        },
        {
          className: 'col-md-4 col-sm-6',
          type: 'input',
          key: 'noOfEmployees',
          templateOptions: {
            label: '# of Employees',
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-md-4 col-sm-6',
          type: 'input',
          key: 'email',
          templateOptions: {
            label: 'Email',
          }
        },
        {
          className: 'col-md-4 col-sm-6',
          type: 'input',
          key: 'phone',
          templateOptions: {
            label: 'Phone',
          }
        },
        {
          className: 'col-md-4 col-sm-6',
          type: 'input',
          key: 'mobile',
          templateOptions: {
            label: 'Mobile',
          }
        }
      ]
    }

  ];



  /*
  fields: FormlyFieldConfig[] = [
    {
      className: 'section-label',
      template: '<div><strong>Basic Information:</strong></div>',
    },
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
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'firstName',
          templateOptions: {
            label: 'First Name',
          },
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'lastName',
          templateOptions: {
            label: 'Last Name',
          }
        }
      ]
    },

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
    },

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
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'website',
          templateOptions: {
            label: 'Website',
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'fax',
          templateOptions: {
            label: 'Fax',
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'annualRevenue',
          templateOptions: {
            label: 'Annual Revenue',
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'twitter',
          templateOptions: {
            label: 'Twitter Handle',
          }
        },
        {
          className: 'col-4',
          key: 'emailOptIn',
          type: 'checkbox',
          templateOptions: {
            label: 'Email Opt-In'

          }
        },
        {
          className: 'col-4',
          key: 'smsOptIn',
          type: 'checkbox',
          templateOptions: {
            label: 'SMS Opt-In'
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [

        {
          className: 'col-4',
          type: 'select',
          key: 'industry',
          templateOptions: {
            label: 'Industry',
            placeholder: 'Select',
            options: [
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'}

            ]
          }
        },

        {
          className: 'col-4',
          type: 'select',
          key: 'leadSource',
          templateOptions: {
            label: 'Lead Source',
            placeholder: 'Select',
            options: [
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'}

            ]
          }
        },

        {
          className: 'col-4',
          type: 'select',
          key: 'leadStatus',
          templateOptions: {
            label: 'Lead Status',
            placeholder: 'Select',
            options: [
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'}

            ]
          }
        }

      ]
    },
    {
      type: 'textarea',
      key: 'street',
      templateOptions: {
        label: 'Description',
        rows: 2,
      },
    },
    {
      className: 'section-label',
      template: '<hr /><div><strong>Address:</strong></div>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'city',
          templateOptions: {
            label: 'City',
          },
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'state',
          templateOptions: {
            label: 'State',
          },
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'country',
          templateOptions: {
            label: 'Country',
          },
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'zip',
          templateOptions: {
            label: 'Zip'
          },
        },
      ],
    },
    {
      type: 'textarea',
      key: 'street',
      templateOptions: {
        label: 'Street',
        rows: 2,
      },
    },
    {
      className: 'section-label',
      template: '<hr /><div><strong>Assignment:</strong></div>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [

        {
          className: 'col-4',
          type: 'select',
          key: 'assignedTo',
          templateOptions: {
            label: 'Assigned To User',
            placeholder: 'Select',
            options: [
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'}

            ]
          }
        },

        {
          className: 'col-4',
          type: 'select',
          key: 'assignedTeam',
          templateOptions: {
            label: 'Assigned To Team',
            placeholder: 'Select',
            options: [
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'},
              {label: 'X', value: 'X'}

            ]
          }
        }

      ]
    }

  ]; */

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
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
