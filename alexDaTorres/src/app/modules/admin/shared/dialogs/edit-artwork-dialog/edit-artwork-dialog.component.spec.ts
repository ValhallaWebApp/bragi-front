import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtworkDialogComponent } from './edit-artwork-dialog.component';

describe('EditArtworkDialogComponent', () => {
  let component: EditArtworkDialogComponent;
  let fixture: ComponentFixture<EditArtworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArtworkDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArtworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
