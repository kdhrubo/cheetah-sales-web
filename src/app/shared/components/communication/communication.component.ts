import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from '../../../services/form.service';
import { Communication } from '../../../models/communication.model';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

  @Input() formName: any;
  @Input() communication: any;
  @Output() updateCommunication = new EventEmitter<object>();

  form = new FormGroup({});

  fields: FormlyFieldConfig[];


  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getFormConfig();
  }

  getFormConfig() {
    this.formService.getFields(this.formName).subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {
    this.updateCommunication.emit(this.communication);
  }

}
