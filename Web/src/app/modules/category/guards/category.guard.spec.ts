import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CategoryGuard } from './category.guard';

describe('CategoryGuard', () => {
  let guard: CategoryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(CategoryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
