import { TestBed } from '@angular/core/testing';

import { PlaceOnClickService } from './place-on-click.service';

describe('PlaceOnClickService', () => {
  let service: PlaceOnClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceOnClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
