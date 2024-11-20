import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog7feedbackDialogComponent } from './dialog7feedback-dialog.component';

describe('Dialog7feedbackDialogComponent', () => {
  let component: Dialog7feedbackDialogComponent;
  let fixture: ComponentFixture<Dialog7feedbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dialog7feedbackDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dialog7feedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
