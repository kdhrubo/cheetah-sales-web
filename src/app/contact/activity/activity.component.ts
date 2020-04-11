import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../models/activity.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormService } from 'src/app/services/form.service';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  rsql = 'deleted==false';
  activities: Activity[];

  model = {};
  form = new FormGroup({});

  fields: FormlyFieldConfig[];

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  @Input() related: string;
  @Input() relatedId: string;

  constructor(
    private modalService: NgbModal,
    private formService: FormService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    // console.log('related - ' + this.related);
    // console.log('relatedId - ' + this.relatedId);

    this.rsql = `deleted==false&relatedEntity=${this.related}&relatedEntityId=${this.relatedId}`;

    this.getFormConfig();
    this.search(this.rsql);
  }

  edit(activity: Activity) {}

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  search(sql: string) {
    this.activityService.search(sql ).subscribe(
      data => {
        this.activities = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  onSubmit() {
    let activity: Activity = this.model as Activity;
    activity.relatedEntity = this.related;
    activity.relatedEntityId = this.relatedId;
    this.activityService.save(activity).subscribe(
      (data) => {
        console.log('Activity save success');
        this.search(this.rsql);
      },
      (error) => {
        console.log('Activity save failure');
      }
    );
  }

  getFormConfig() {
    this.formService.getFields('activity-form').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }
}
