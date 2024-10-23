import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPassionComponent } from './artist-passion.component';

describe('ArtistPassionComponent', () => {
  let component: ArtistPassionComponent;
  let fixture: ComponentFixture<ArtistPassionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistPassionComponent]
    });
    fixture = TestBed.createComponent(ArtistPassionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
