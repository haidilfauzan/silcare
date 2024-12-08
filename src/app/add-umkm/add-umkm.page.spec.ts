import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUmkmPage } from './add-umkm.page';

describe('AddUmkmPage', () => {
  let component: AddUmkmPage;
  let fixture: ComponentFixture<AddUmkmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUmkmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
