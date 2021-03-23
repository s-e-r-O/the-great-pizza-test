import { Component, OnInit } from '@angular/core';
import * as fromRouter from '@app/store';
import { RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  links = [
    { label: 'Pizzas', url: '/pizzas' },
    { label: 'Ingredients', url: '/ingredients' },
  ];
  activeLink$: Observable<string>;
  constructor(private store: Store<RouterReducerState>) {
    this.activeLink$ = this.store.select(fromRouter.selectUrl);
  }

  ngOnInit(): void {}
}
