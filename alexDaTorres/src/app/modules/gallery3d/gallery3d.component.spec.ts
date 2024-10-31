import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gallery3dComponent } from './gallery3d.component';

describe('Gallery3dComponent', () => {
  let component: Gallery3dComponent;
  let fixture: ComponentFixture<Gallery3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gallery3dComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gallery3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
