import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewUserListComponent } from './review-user-list.component';

describe('ReviewUserListComponent', () => {
  let component: ReviewUserListComponent;
  let fixture: ComponentFixture<ReviewUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
