import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIngredientFormComponent } from './create-ingredient-form.component';

describe('CreateIngredientFormComponent', () => {
  let component: CreateIngredientFormComponent;
  let fixture: ComponentFixture<CreateIngredientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIngredientFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIngredientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
