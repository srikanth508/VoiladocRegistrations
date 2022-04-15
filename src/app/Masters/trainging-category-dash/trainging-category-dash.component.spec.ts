import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraingingCategoryDashComponent } from './trainging-category-dash.component';

describe('TraingingCategoryDashComponent', () => {
  let component: TraingingCategoryDashComponent;
  let fixture: ComponentFixture<TraingingCategoryDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraingingCategoryDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraingingCategoryDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
