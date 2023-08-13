import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMoviesComponent } from './upload-movies.component';

describe('UploadMoviesComponent', () => {
  let component: UploadMoviesComponent;
  let fixture: ComponentFixture<UploadMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadMoviesComponent]
    });
    fixture = TestBed.createComponent(UploadMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
