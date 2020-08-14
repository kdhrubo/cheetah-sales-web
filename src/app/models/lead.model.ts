import { Address } from './address.model';
import { Note } from './note.model';

export class Lead {
    salutationId: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    country: string;
    city: string;
    leadSourceId: string;
    contactTypeId: string;
    contactStatusId: string;
    designation: string;
    mobile: string;
    linkedin: string;
    facebook: string;
    twitter: string;

    address: Address;
    products: any[];
    documents: any[];

    createdDate: Date;

    notes: Note[];
}


