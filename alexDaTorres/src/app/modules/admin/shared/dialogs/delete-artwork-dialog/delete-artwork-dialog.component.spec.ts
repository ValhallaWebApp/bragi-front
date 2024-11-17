import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArtworkDialogComponent } from './delete-artwork-dialog.component';

describe('DeleteArtworkDialogComponent', () => {
  let component: DeleteArtworkDialogComponent;
  let fixture: ComponentFixture<DeleteArtworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteArtworkDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteArtworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
