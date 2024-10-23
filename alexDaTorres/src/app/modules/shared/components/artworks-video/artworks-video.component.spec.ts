import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksVideoComponent } from './artworks-video.component';

describe('ArtworksVideoComponent', () => {
  let component: ArtworksVideoComponent;
  let fixture: ComponentFixture<ArtworksVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtworksVideoComponent]
    });
    fixture = TestBed.createComponent(ArtworksVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
