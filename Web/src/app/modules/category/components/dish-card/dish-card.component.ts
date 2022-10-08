import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '@data/types/models';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent implements OnInit {
  @Input() last!: boolean;
  @Input() dish!: Dish;

  constructor() {}

  ngOnInit(): void {}
}
