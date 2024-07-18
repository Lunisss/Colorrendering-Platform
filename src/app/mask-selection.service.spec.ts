import { TestBed } from '@angular/core/testing';

import { MaskSelectionService } from './mask-selection.service';

describe('MaskSelectionService', () => {
  let service: MaskSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaskSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
