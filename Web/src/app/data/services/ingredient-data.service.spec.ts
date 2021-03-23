import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IngredientDataService } from './ingredient-data.service';

describe('IngredientDataService', () => {
  let service: IngredientDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(IngredientDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
