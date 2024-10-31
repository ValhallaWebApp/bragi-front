import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostreComponent } from './mostre.component';

describe('MostreComponent', () => {
  let component: MostreComponent;
  let fixture: ComponentFixture<MostreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
