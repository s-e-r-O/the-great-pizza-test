import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IngredientVM } from '@data/types/view-models';

@Component({
  selector: 'app-ingredient-chip',
  templateUrl: './ingredient-chip.component.html',
  styleUrls: ['./ingredient-chip.component.scss'],
})
export class IngredientChipComponent implements OnInit {
  @Input() ingredient!: IngredientVM;
  @Input() removable: boolean = false;
  @Input() color: string = 'primary';
  @Output() ingredientRemoved: EventEmitter<IngredientVM> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onRemoved(): void {
    this.ingredientRemoved.emit(this.ingredient);
  }
}
