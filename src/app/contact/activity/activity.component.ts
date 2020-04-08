import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../models/activity.model';
import { Page } from '../../models/page.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activitiesPage: Page<Activity>;

  pageNo = 1;
  pageSize = 10;

  @Input() related: string;
  @Input() relatedId: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log('related - ' + this.related);
    console.log('relatedId - ' + this.relatedId);
  }

  edit(activity: Activity) {

  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}
