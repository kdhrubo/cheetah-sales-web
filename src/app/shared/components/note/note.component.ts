import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Note } from 'src/app/models/note.model';
import { FormService } from '../../../services/form.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {

  @Input() notes: Note[];
  @Output() addNote = new EventEmitter<object>();

  model = {};
  form = new FormGroup({});

  fields: FormlyFieldConfig[];


  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.getFormConfig();
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
    this.addNote.emit(note);

  }
}
