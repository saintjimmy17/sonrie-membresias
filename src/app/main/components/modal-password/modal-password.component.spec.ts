import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPasswordComponent } from './modal-password.component';

describe('ModalPasswordComponent', () => {
  let component: ModalPasswordComponent;
  let fixture: ComponentFixture<ModalPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPasswordComponent]
    });
    fixture = TestBed.createComponent(ModalPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
