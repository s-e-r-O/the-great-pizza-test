import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInFrom = (side: 'left' | 'right') => [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      [side]: 0,
      width: '100%',
    }),
  ]),
  query(':enter', [style({ [side]: '-100%' })]),
  query(':leave', animateChild()),
  group([
    query(':leave', [animate('300ms ease-out', style({ [side]: '100%' }))]),
    query(':enter', [animate('300ms ease-out', style({ [side]: '0%' }))]),
  ]),
  query(':enter', animateChild()),
];

export const routeAnimation = trigger('routeAnimations', [
  transition('IngredientsComponent => PizzasComponent', slideInFrom('left')),
  transition('PizzasComponent => IngredientsComponent', slideInFrom('right')),
]);
