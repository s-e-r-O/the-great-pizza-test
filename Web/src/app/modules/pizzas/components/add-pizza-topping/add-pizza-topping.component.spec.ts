import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPizzaToppingComponent } from './add-pizza-topping.component';

describe('AddPizzaToppingComponent', () => {
  let component: AddPizzaToppingComponent;
  let fixture: ComponentFixture<AddPizzaToppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPizzaToppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPizzaToppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
