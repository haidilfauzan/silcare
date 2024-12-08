import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMyproductPage } from './add-myproduct.page';

describe('AddMyproductPage', () => {
  let component: AddMyproductPage;
  let fixture: ComponentFixture<AddMyproductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMyproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
