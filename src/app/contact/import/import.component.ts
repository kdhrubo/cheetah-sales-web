import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  public contacts: Contact[] = [];
  @ViewChild('csvReader')
  csvReader: any;

  @ViewChild('labelImport')
  labelImport: ElementRef;

  formImport: FormGroup;
  fileToUpload: File = null;

  constructor(private contactService: ContactService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {}

  onFileSelected(files: FileList): void {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  upload(): void {
    console.log('import ' + this.fileToUpload.name);

    if (this.isValidCSVFile(this.fileToUpload)) {
      const reader = new FileReader();
      reader.readAsText(this.fileToUpload);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.contacts = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );

        console.log('Records - ' + JSON.stringify(this.contacts));

        //now call API service

        this.contactService.saveAll(this.contacts).subscribe(
          data => {console.log('imported'); },

          error => {console.log('error - ' + error); }

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

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < csvRecordsArray.length; i++) {
      const curruntRecord = (csvRecordsArray[i] as string).split(',');
      if (curruntRecord.length == headerLength) {
        const contact: Contact = new Contact();

        contact.firstName = curruntRecord[0].trim();
        contact.lastName = curruntRecord[1].trim();
        contact.email = curruntRecord[2].trim();
        contact.dob = curruntRecord[3].trim();
        contact.mobile = curruntRecord[4].trim();
        contact.twitter = curruntRecord[5].trim();
        contact.facebook = curruntRecord[6].trim();
        contact.linkedin = curruntRecord[7].trim();

        csvArr.push(contact);
      }
    }
    return csvArr;
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];
    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.contacts = [];
  }

  isValidCSVFile(file: File) {
    return file.name.endsWith('.csv');
  }
}
