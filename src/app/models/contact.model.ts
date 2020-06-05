import { Address } from './address.model';
import { Phone } from './phone.model';
import { Note } from './note.model';
import { Emails } from './emails.model';

export class Contact {
  id: string;
  firstName: string;
  lastName: string;

  email: string;
  dob: string;

  company: string;
  country: string;
  city: string;

  salutationId: string;
  leadSourceId: string;
  contactTypeId: string;
  contactStatusId: string;

  designation: string;
  mobile: string;
  //social
  linkedin: string;
  facebook: string;
  twitter: string;
  website: string;

  emails: Emails;
  addresses: Address[];
  phones: Phone[];

  notes: Note[];
}
