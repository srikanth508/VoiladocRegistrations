import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChaptersDashComponent } from './course-chapters-dash.component';

describe('CourseChaptersDashComponent', () => {
  let component: CourseChaptersDashComponent;
  let fixture: ComponentFixture<CourseChaptersDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseChaptersDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseChaptersDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
