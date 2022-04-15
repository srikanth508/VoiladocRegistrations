import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentDocotorComponent } from './independent-docotor.component';

describe('IndependentDocotorComponent', () => {
  let component: IndependentDocotorComponent;
  let fixture: ComponentFixture<IndependentDocotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentDocotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentDocotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
