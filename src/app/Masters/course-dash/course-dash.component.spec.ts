import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDashComponent } from './course-dash.component';

describe('CourseDashComponent', () => {
  let component: CourseDashComponent;
  let fixture: ComponentFixture<CourseDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
