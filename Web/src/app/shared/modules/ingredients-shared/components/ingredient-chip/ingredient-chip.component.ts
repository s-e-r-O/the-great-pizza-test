import { Component, Input, OnInit } from '@angular/core';
import { IngredientVM } from '@data/types/view-models';

@Component({
  selector: 'app-ingredient-chip',
  templateUrl: './ingredient-chip.component.html',
  styleUrls: ['./ingredient-chip.component.scss'],
})
export class IngredientChipComponent implements OnInit {
  @Input() ingredient!: IngredientVM;
  constructor() {}

  ngOnInit(): void {}
}
