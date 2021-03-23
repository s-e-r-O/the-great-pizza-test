import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpErrorInterceptor, { provide: MatSnackBar, useValue: {} }],
    })
  );

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(
      HttpErrorInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
