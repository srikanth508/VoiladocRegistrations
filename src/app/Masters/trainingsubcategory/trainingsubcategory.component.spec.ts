import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsubcategoryComponent } from './trainingsubcategory.component';

describe('TrainingsubcategoryComponent', () => {
  let component: TrainingsubcategoryComponent;
  let fixture: ComponentFixture<TrainingsubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
