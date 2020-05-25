import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from '../../services/form.service';
import { BoxsettingService } from '../../services/boxsetting.service';
import { BoxSetting } from 'src/app/models/boxsetting.model';

@Component({
  selector: 'app-boxsettings',
  templateUrl: './boxsettings.component.html',
  styleUrls: ['./boxsettings.component.css'],
})
export class BoxsettingsComponent implements OnInit {
  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  boxSettings: BoxSetting;

  constructor(
    private boxsettingService: BoxsettingService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.boxsettingService.findOne().subscribe(
      (data) => {
        console.log('data - ' + data);
        this.boxSettings = data;
        this.getFormConfig();
      },
      (error) => {
        console.log('Unable to retrieve Boxsettings details');
      }
    );
  }

  getFormConfig() {
    this.formService.getFields('form-box').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {


    console.log('Box settings - ' + JSON.stringify(this.boxSettings));

    this.boxsettingService.save(this.boxSettings).subscribe(
        data => {
          this.boxSettings = data;
        },
        error => {
          console.log('Error adding  box.');
        }

      );

  }
}
