import { PickList } from './picklist.model';

export class Contact {
    id: string;
    firstName: string;
    lastName: string;

    email: string;
    company: string;
    country: string;
    city: string;

    salutation: PickList;
}
