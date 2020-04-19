import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Lead } from 'src/app/models/lead.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  public leads: Lead[] = [];

  @ViewChild('csvReader')
  csvReader: any;

  @ViewChild('labelImport')
  labelImport: ElementRef;

  formImport: FormGroup;
  fileToUpload: File = null;

  constructor(private leadService:LeadService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {

    console.log('Import Lead component has been loaded.')
  }

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
        console.log('CSV header length 1: '+csvRecordsArray.length)
        const headers = (csvRecordsArray[0] as string).split(',')
        this.leads = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headers.length
        );
        console.log('Records - ' + JSON.stringify(this.leads));
        //now call Lead SaveALL API service
        this.leadService.saveAll(this.leads).subscribe(
          data => {console.log('Lead imported succesfully from csv file.'); },

          error => {console.log('Exception reported while importing lead from csv file.' + error); }

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
    this.csvReader.nativeElement.value = '';
    this.leads = [];
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

  getLeadFromCsvFile(currentRecord: any): Lead {

    const lead: Lead = new Lead();
    //   Convert lead info from csv into Lead Object
    lead.firstName = currentRecord[0].trim();
    lead.lastName = currentRecord[1].trim();
    lead.email = currentRecord[2].trim();
    lead.company = currentRecord[3].trim();
    lead.country = currentRecord[4].trim();
    lead.city = currentRecord[5].trim();
    lead.designation = currentRecord[6].trim();
    lead.mobile = currentRecord[7].trim();
    lead.linkedin = currentRecord[8].trim();
    lead.facebook = currentRecord[9].trim();
    lead.twitter = currentRecord[10].trim();
    console.log('Populating CSV data into lead.');
    return lead;
  }

}
