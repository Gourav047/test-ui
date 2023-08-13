import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSectionComponent } from './feature-section.component';

describe('FeatureSectionComponent', () => {
  let component: FeatureSectionComponent;
  let fixture: ComponentFixture<FeatureSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureSectionComponent]
    });
    fixture = TestBed.createComponent(FeatureSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
