import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Task } from 'src/app/models/task.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'src/app/services/form.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  rsql = 'deleted==false';
  tasks: Task[];

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
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // console.log('related - ' + this.related);
    // console.log('relatedId - ' + this.relatedId);

    this.rsql = `deleted==false&relatedEntity=${this.related}&relatedEntityId=${this.relatedId}`;

    this.getFormConfig();
    this.search(this.rsql);
  }

  edit(task: Task) {}

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  search(sql: string) {
    this.taskService.search(sql ).subscribe(
      data => {
        this.tasks = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  onSubmit() {
    let task: Task = this.model as Task;
    task.relatedEntity = this.related;
    task.relatedEntityId = this.relatedId;
    this.taskService.save(task).subscribe(
      (data) => {
        console.log('Task save success');
        this.search(this.rsql);
      },
      (error) => {
        console.log('Task save failure');
      }
    );
  }

  getFormConfig() {
    this.formService.getFields('task-form').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

}
