import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { AccountService } from '../../services/account.service';
import { Page } from '../../models/page.model';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-picklist',
  templateUrl: './contact-picklist.component.html',
  styleUrls: ['./contact-picklist.component.css']
})
export class ContactPicklistComponent extends FieldType implements OnInit {

  contacts: Page<Contact>;
  rsql = 'deleted==false';
  pageNo = 1;
  pageSize = 10;
  collectionSize: number;
  val = '';
  contactId: string;
  contact: Contact;

  constructor(private modalService: NgbModal,private contactService: ContactService) {
    super();
   }

  ngOnInit(): void {
    console.log('### key - ' + this.field.key);
    console.log('### Contact id - ' + this.model[this.field.key]);
    this.contactId = this.model[this.field.key];
    if (this.contactId != null) {
      console.log('## get contact details ');
      this.contactService.findOne(this.contactId).subscribe(
        data => {
          this.contact = data;
          this.setField(this.contact);
        },
        error => console.log('Error reported while loading contact details - ' + error.message)
      );
    }

    this.load();
  }

  setField(contactModel: Contact) {
    console.log('contactModel - ' + JSON.stringify(contactModel));
    if ( contactModel?.id != null ) {
      this.val = contactModel?.firstName;
      this.formControl.setValue(contactModel?.id);
    }
  }

  load() {
    this.contactService.search(this.rsql, this.pageNo - 1, this.pageSize ).subscribe(
      data => {
        this.contacts = data;
      },
      error => console.log('Error while loading list of contact - ' + error.message)
    );
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }


}
