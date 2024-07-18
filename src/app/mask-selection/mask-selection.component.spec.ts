import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskSelectionComponent } from './mask-selection.component';

describe('MaskSelectionComponent', () => {
  let component: MaskSelectionComponent;
  let fixture: ComponentFixture<MaskSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaskSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaskSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
