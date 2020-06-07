import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../models/page.model';
import { ContactService } from '../../services/contact.service';
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
  fieldName = 'contactName';


  constructor(private modalService: NgbModal,private contactService: ContactService) {
    super();
   }

  ngOnInit(): void {
    this.contactId = this.model[this.field.key];
    const contactName = this.model[this.fieldName];

    if (this.contactId != null) {

      this.val = contactName;
      this.formControl.setValue(this.contactId);
      this.model[this.fieldName] = contactName;
    }

    this.load();
  }

  setField(c: Contact) {
    if ( c?.id != null ) {
      this.val = c?.firstName + ' ' + c?.lastName;
      this.formControl.setValue(c?.id);
      this.model[this.fieldName] = c?.firstName + ' ' + c?.lastName;
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
