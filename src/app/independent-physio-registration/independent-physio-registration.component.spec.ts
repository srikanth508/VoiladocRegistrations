import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentPhysioRegistrationComponent } from './independent-physio-registration.component';

describe('IndependentPhysioRegistrationComponent', () => {
  let component: IndependentPhysioRegistrationComponent;
  let fixture: ComponentFixture<IndependentPhysioRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentPhysioRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentPhysioRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
