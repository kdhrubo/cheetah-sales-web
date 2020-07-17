import { Address } from './address.model';
import { Note } from './note.model';
import { Emails } from './emails.model';

export class Currency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  country: string;
}

export class TenantCurrency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  active: boolean;
  corporate: boolean;
  conversionRates: ConversionRate[];
}

export class ConversionRate {
  rate: any;
  from: Date;
  to: Date;
}
