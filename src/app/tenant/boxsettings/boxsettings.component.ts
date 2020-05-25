import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from '../../services/form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-boxsettings',
  templateUrl: './boxsettings.component.html',
  styleUrls: ['./boxsettings.component.css']
})
export class BoxsettingsComponent implements OnInit {
  
  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  @Input() boxSettings: any;

  @Output() addBox = new EventEmitter<object>();



  constructor(private modalService: NgbModal,
              private formService: FormService) { }

  ngOnInit(): void {
    this.getFormConfig();
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

    this.addBox.emit(this.boxSettings);
  }

}
