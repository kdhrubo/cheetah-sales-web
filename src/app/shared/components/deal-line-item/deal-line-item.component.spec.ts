import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealLineItemComponent } from './deal-line-item.component';

describe('DealLineItemComponent', () => {
  let component: DealLineItemComponent;
  let fixture: ComponentFixture<DealLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealLineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
