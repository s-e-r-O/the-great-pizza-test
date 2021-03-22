import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { PizzaVM } from '@data/types/view-models';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaCardComponent implements OnInit {
  @Input() pizza!: PizzaVM;

  constructor() {}

  ngOnInit(): void {}
}
