import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginContactComponent } from './loginContact.component';

describe('LoginContactComponent', () => {
  let component: LoginContactComponent;
  let fixture: ComponentFixture<LoginContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
