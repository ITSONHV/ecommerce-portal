import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductRecentComponent } from './product-recent.component';

describe('ProductRecentComponent', () => {
  let component: ProductRecentComponent;
  let fixture: ComponentFixture<ProductRecentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRecentComponent]
    });
    fixture = TestBed.createComponent(ProductRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
