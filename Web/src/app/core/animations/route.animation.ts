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
      bottom: 0,
      [side]: 0,
      width: '100%',
      opacity: 1,
    }),
  ]),
  query(':enter', [style({ [side]: '-100%', opacity: 0 })]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ [side]: '100%', opacity: 0 })),
    ]),
    query(':enter', [
      animate('300ms ease-out', style({ [side]: '0%', opacity: 1 })),
    ]),
  ]),
  query(':enter', animateChild()),
];

export const routeAnimation = trigger('routeAnimations', [
  transition('IngredientsComponent => PizzasComponent', slideInFrom('left')),
  transition('PizzasComponent => IngredientsComponent', slideInFrom('right')),
  transition('* <=> fade', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 1,
      }),
    ]),
    query(':enter', [style({ opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
      query(':enter', [animate('300ms ease-out', style({ opacity: 1 }))]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
