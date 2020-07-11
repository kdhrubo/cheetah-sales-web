import { Address } from './address.model';

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
    products: LeadProduct[];

    createdDate: Date;
}

class LeadProduct {
    id: string;
    name: string;
}