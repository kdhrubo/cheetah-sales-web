import { Currency } from './Currency.model';
import { PriceBook } from './Price-Book.model';
import { Product } from './Product.model';


export class ProductPrice {

  id: string;
  active: boolean;
  listPrice: number;

  currency: Currency;
  priceBook: PriceBook;
  Product: Product;

  standardPrice: number;
  useStandardPrice: boolean;

}
