import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsComponent } from './ingredients.component';
import * as fromIngredients from '@modules/ingredients/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('IngredientsComponent', () => {
  let component: IngredientsComponent;
  let fixture: ComponentFixture<IngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientsComponent],
      imports: [NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromIngredients.selectAllIngredients, value: [] },
          ],
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
