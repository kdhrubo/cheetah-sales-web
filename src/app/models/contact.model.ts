import { Address } from './address.model';
import { Note } from './note.model';
import { Emails } from './emails.model';

export class Contact {
  id: string;
  firstName: string;
  lastName: string;

  dob: string;

  company: string;
  country: string;
  city: string;

  salutationId: string;
  leadSourceId: string;
  contactTypeId: string;
  contactStatusId: string;

  designation: string;


  // social
  linkedin: string;
  facebook: string;
  twitter: string;
  website: string;

  // communication
  email: string;
  otherEmail: string;
  phone: string;
  otherPhone: string;
  mobile: string;
  fax: string;

  emails: Emails;
  primaryAddress: Address;
  secondaryAddress: Address;

  notes: Note[];
}
