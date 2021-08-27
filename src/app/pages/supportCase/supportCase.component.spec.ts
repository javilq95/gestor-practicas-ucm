import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCaseComponent } from './supportCase';

describe('NewOpportunityComponent', () => {
  let component: SupportCaseComponent;
  let fixture: ComponentFixture<SupportCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
