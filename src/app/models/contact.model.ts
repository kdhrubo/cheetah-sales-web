import { EmailAddress } from './emailaddress.model';
import { Address } from './address.model';
import { Phone } from './phone.model';

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
  linkedin: string;
  facebook: string;
  twitter: string;
  emailAddresses: EmailAddress[];
  addresses: Address[];
  phones: Phone[];
}
