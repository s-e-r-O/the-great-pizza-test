import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientChipComponent } from './ingredient-chip.component';

describe('IngredientChipComponent', () => {
  let component: IngredientChipComponent;
  let fixture: ComponentFixture<IngredientChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientChipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientChipComponent);
    component = fixture.componentInstance;
    component.ingredient = { name: '', id: 0 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
