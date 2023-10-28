import { TestBed } from '@angular/core/testing';

import { AddressToCoordinatesService } from './address-to-coordinates.service';

describe('AddressToCoordinatesService', () => {
  let service: AddressToCoordinatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressToCoordinatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
