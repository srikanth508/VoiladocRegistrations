import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentNurseComponent } from './independent-nurse.component';

describe('IndependentNurseComponent', () => {
  let component: IndependentNurseComponent;
  let fixture: ComponentFixture<IndependentNurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentNurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
