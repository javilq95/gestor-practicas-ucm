import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAccountComponent } from './registerAccount.component';

describe('RegisterAccountComponent', () => {
  let component: RegisterAccountComponent;
  let fixture: ComponentFixture<RegisterAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
