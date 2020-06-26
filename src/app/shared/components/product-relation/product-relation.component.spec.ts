import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRelationComponent } from './product-relation.component';

describe('ProductRelationComponent', () => {
  let component: ProductRelationComponent;
  let fixture: ComponentFixture<ProductRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
