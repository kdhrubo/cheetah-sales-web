import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Account } from '../../models/account.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  public accounts: Account[] = [];

  @ViewChild('csvFileReaderRef')
  csvFileReaderRef: any;

  @ViewChild('labelImportRef')
  labelImportRef: ElementRef;

  formImport: FormGroup;
  fileToUpload: File = null;

  constructor(private accountService: AccountService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    console.log('Import Account component has been loaded.')
  }

  onFileSelected(files: FileList): void {
    this.labelImportRef.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
    console.log('File to be uploaded ' + this.fileToUpload.name);
  }

  upload(): void {
    console.log('import ' + this.fileToUpload.name);

    if (this.isValidCSVFile(this.fileToUpload)) {
      const reader = new FileReader();
      reader.readAsText(this.fileToUpload);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        console.log('CSV header length 1: ' + csvRecordsArray.length)
        const headers = (csvRecordsArray[0] as string).split(',')
        this.accounts = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headers.length
        );
        console.log('Records - ' + JSON.stringify(this.accounts));
        //  now call Lead SaveALL API service
        this.accountService.saveAll(this.accounts).subscribe(
          data => { console.log('Lead imported succesfully from csv file.'); },

          error => { console.log('Exception reported while importing lead from csv file.' + error); }

        );

      };

      reader.onerror = () => {
        console.log('error is occured while reading file!');
      };
    } else {
      console.log('Please import valid .csv file.');
      this.fileReset();
    }
  }

  isValidCSVFile(file: File) {
    return file.name.endsWith('.csv');
  }

  fileReset() {
    this.csvFileReaderRef.nativeElement.value = '';
    this.accounts = [];
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < csvRecordsArray.length; i++) {
      const currentRecord = (csvRecordsArray[i] as string).split(',');
      if (currentRecord.length == headerLength) {
        csvArr.push(this.getLeadFromCsvFile(currentRecord));
      }
    }
    return csvArr;
  }

  getLeadFromCsvFile(currentRecord: any): Account {

    const account: Account = new Account();
    //   Convert account info from csv into Account Object
    account.name = currentRecord[0].trim();
    account.website = currentRecord[1].trim();
    account.phone = currentRecord[2].trim();
    account.fax = currentRecord[3].trim();
    account.annualRevenue = currentRecord[4].trim();
    account.noOfEmployees = currentRecord[5].trim();
    account.company = currentRecord[6].trim();
    account.email = currentRecord[7].trim();
    account.mobile = currentRecord[8].trim();
    console.log('Populating CSV data into Account.');
    return account;
  }

}
