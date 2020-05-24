import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxsettingsComponent } from './boxsettings.component';

describe('BoxsettingsComponent', () => {
  let component: BoxsettingsComponent;
  let fixture: ComponentFixture<BoxsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
