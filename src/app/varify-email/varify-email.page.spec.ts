import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VarifyEmailPage } from './varify-email.page';

describe('VarifyEmailPage', () => {
  let component: VarifyEmailPage;
  let fixture: ComponentFixture<VarifyEmailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VarifyEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
