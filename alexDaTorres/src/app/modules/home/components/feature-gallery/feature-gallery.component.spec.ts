import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureGalleryComponent } from './feature-gallery.component';

describe('FeatureGalleryComponent', () => {
  let component: FeatureGalleryComponent;
  let fixture: ComponentFixture<FeatureGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureGalleryComponent]
    });
    fixture = TestBed.createComponent(FeatureGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
