import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectwrapperComponent } from './selectwrapper.component';

describe('SelectwrapperComponent', () => {
  let component: SelectwrapperComponent;
  let fixture: ComponentFixture<SelectwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
