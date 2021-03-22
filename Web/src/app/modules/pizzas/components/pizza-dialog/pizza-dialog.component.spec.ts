import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaDialogComponent } from './pizza-dialog.component';

describe('PizzaDialogComponent', () => {
  let component: PizzaDialogComponent;
  let fixture: ComponentFixture<PizzaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
