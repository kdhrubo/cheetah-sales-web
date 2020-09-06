import { Tax } from './tax.model';


export class Charge {
    id: string;
    chargeName: string;  
    chargeFormat: string;
    chargeType: string;
    chargeValue: number;
    isTaxable: boolean;
    tax: Tax;
}
