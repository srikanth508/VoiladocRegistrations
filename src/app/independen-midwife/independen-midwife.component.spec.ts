import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependenMidwifeComponent } from './independen-midwife.component';

describe('IndependenMidwifeComponent', () => {
  let component: IndependenMidwifeComponent;
  let fixture: ComponentFixture<IndependenMidwifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependenMidwifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependenMidwifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
