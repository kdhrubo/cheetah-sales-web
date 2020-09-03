import { ChargeFormat } from './chargeFormat.enum';
import { Tax } from './tax.model';
import { ChargeType } from './chargeType.enum';

export class Charge {
    id: string;
    chargeName: string;  
    chargeFormat: ChargeFormat;
    chargeType: ChargeType;
    chargeValue: number;
    isTaxable: boolean;
    tax: Tax;
}
