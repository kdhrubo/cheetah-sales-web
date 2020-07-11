import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRelationComponent } from './document-relation.component';

describe('DocumentRelationComponent', () => {
  let component: DocumentRelationComponent;
  let fixture: ComponentFixture<DocumentRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
