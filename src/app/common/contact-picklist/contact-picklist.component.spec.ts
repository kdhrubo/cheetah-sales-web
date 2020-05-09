import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPicklistComponent } from './contact-picklist.component';

describe('ContactPicklistComponent', () => {
  let component: ContactPicklistComponent;
  let fixture: ComponentFixture<ContactPicklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPicklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
