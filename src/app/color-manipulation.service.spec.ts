import { TestBed } from '@angular/core/testing';

import { ColorManipulationService } from './color-manipulation.service';

describe('ColorManipulationService', () => {
  let service: ColorManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
