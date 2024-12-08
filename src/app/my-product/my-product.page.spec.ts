import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyProductPage } from './my-product.page';

describe('MyProductPage', () => {
  let component: MyProductPage;
  let fixture: ComponentFixture<MyProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
