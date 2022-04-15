import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsubcategorydashComponent } from './trainingsubcategorydash.component';

describe('TrainingsubcategorydashComponent', () => {
  let component: TrainingsubcategorydashComponent;
  let fixture: ComponentFixture<TrainingsubcategorydashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsubcategorydashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsubcategorydashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
