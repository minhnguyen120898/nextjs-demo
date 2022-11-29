import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelSearchComponent } from './model-search.component';

describe('ModelSearchComponent', () => {
  let component: ModelSearchComponent;
  let fixture: ComponentFixture<ModelSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
