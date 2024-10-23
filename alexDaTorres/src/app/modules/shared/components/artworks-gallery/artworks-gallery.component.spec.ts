import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksGalleryComponent } from './artworks-gallery.component';

describe('ArtworksGalleryComponent', () => {
  let component: ArtworksGalleryComponent;
  let fixture: ComponentFixture<ArtworksGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtworksGalleryComponent]
    });
    fixture = TestBed.createComponent(ArtworksGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
