import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkDialogComponent } from './artwork-dialog.component';

describe('ArtworkDialogComponent', () => {
  let component: ArtworkDialogComponent;
  let fixture: ComponentFixture<ArtworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
