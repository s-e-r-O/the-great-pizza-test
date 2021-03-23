import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PizzaDialogComponent } from './pizza-dialog.component';

describe('PizzaDialogComponent', () => {
  let component: PizzaDialogComponent;
  let fixture: ComponentFixture<PizzaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzaDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { name: '' } },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
      ],
    }).compileComponents();
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
