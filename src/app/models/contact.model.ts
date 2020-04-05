import { PickList } from './picklist.model';

export class Contact {
  id: string;
  firstName: string;
  lastName: string;

  email: string;
  dob: string;

  company: string;
  country: string;
  city: string;

  salutation: PickList;
  title: PickList;
  mobile: string;
  linkedin: string;
  facebook: string;
  twitter: string;
}
