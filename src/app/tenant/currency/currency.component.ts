import { Component, OnInit } from '@angular/core';
import { TenantCurrencyService } from '../../services/tenantcurrency.service';
import { TenantCurrency, Currency } from '../../models/currency.model';
import { CurrencyService } from '../../services/currency.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  tenantCurrencies: TenantCurrency[];
  currencies: Currency[];

  constructor(
    private modalService: NgbModal,
    private currencyService: CurrencyService,
    private tenantCurrencyService: TenantCurrencyService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const rsql = `deleted==false`;
    this.search(rsql);
  }

  search(sql: string) {
    this.tenantCurrencyService.searchAll(sql).subscribe(
      data => {
        this.tenantCurrencies = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  searchCurrencies(sql: string) {
    this.currencyService.searchAll(sql).subscribe(
      data => {
        this.currencies = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  openLg(content) {
    const rsql = `deleted==false`;
    this.searchCurrencies(rsql);
    this.modalService.open(content, { size: 'lg' });
  }

  add(c: Currency) {
    const tc = new TenantCurrency();
    tc.name = c.name;
    tc.code = c.code;
    tc.symbol = c.symbol;

    const rsql = `deleted==false`;

    console.log('tc - ' + tc);

    this.tenantCurrencyService.add(tc).subscribe(
      data => {
        this.toastr.success('Currency added Successfully.', '', {});
        this.modalService.dismissAll();
        this.search(rsql);
      },
      error => {
        this.toastr.error('Currency add failed.', error?.detail, {});
        this.modalService.dismissAll();
      }
    );

  }

  makeActive(tc: TenantCurrency) {
    const rsql = `deleted==false`;
    this.tenantCurrencyService.activate(tc.id).subscribe(
      data => {
        this.toastr.success('Currency activated Successfully.', '', {});
        this.search(rsql);
      },
      error => {
        this.toastr.error('Currency activation failed.', error?.detail, {});
      }
    );
  }

  makeBase(tc: TenantCurrency) {
    const rsql = `deleted==false`;
    this.tenantCurrencyService.makeBase(tc.id).subscribe(
      data => {
        this.toastr.success('Currency set as base currency successfully.', '', {});
        this.search(rsql);
      },
      error => {
        this.toastr.error('Currency could not be set as base currency.', error?.detail, {});
      }
    );
  }

}
