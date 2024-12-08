import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBankPage } from './add-bank.page';

describe('AddBankPage', () => {
  let component: AddBankPage;
  let fixture: ComponentFixture<AddBankPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
