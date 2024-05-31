import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRegisterComponent } from './send-register.component';

describe('SendRegisterComponent', () => {
  let component: SendRegisterComponent;
  let fixture: ComponentFixture<SendRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendRegisterComponent]
    });
    fixture = TestBed.createComponent(SendRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
