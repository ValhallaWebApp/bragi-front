import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkCardComponent } from './artwork-card.component';

describe('ArtworkCardComponent', () => {
  let component: ArtworkCardComponent;
  let fixture: ComponentFixture<ArtworkCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtworkCardComponent]
    });
    fixture = TestBed.createComponent(ArtworkCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
