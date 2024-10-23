import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistInspirationComponent } from './artist-inspiration.component';

describe('ArtistInspirationComponent', () => {
  let component: ArtistInspirationComponent;
  let fixture: ComponentFixture<ArtistInspirationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistInspirationComponent]
    });
    fixture = TestBed.createComponent(ArtistInspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
