import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PizzaDataService } from './pizza-data.service';

describe('PizzaDataService', () => {
  let service: PizzaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PizzaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
