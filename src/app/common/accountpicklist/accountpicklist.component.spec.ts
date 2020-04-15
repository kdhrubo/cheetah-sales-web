import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountpicklistComponent } from './accountpicklist.component';

describe('AccountpicklistComponent', () => {
  let component: AccountpicklistComponent;
  let fixture: ComponentFixture<AccountpicklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountpicklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountpicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
