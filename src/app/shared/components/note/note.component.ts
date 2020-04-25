import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Note } from 'src/app/models/note.model';
import { FormService } from '../../../services/form.service';
import { NoteService } from '../../../services/note.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  rsql = 'deleted==false';
  notes: Note[];

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

  constructor(private formService: FormService, private noteService: NoteService) {}

  ngOnInit(): void {
    this.rsql = `deleted==false&relatedEntity=${this.related}&relatedEntityId=${this.relatedId}`;

    this.getFormConfig();
    this.search(this.rsql);
  }
  search(sql: string) {
    this.noteService.search(sql ).subscribe(
      data => {
        this.notes = data;
      },
      error => console.log('Error - ' + error.message)
    );
  }

  getFormConfig() {
    this.formService.getFields('note-form').subscribe(
      (data) => {
        this.fields = data;
      },

      (error) => {
        console.log('Unable to retrieve form information');
      }
    );
  }

  onSubmit() {
    let note: Note = this.model as Note;
    note.relatedEntity = this.related;
    note.relatedEntityId = this.relatedId;
    this.noteService.save(note).subscribe(
      (data) => {
        console.log('Note save success');
        this.search(this.rsql);
      },
      (error) => {
        console.log('Note save failure');
      }
    );

  }
}
