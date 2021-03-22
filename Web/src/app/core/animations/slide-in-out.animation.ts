import {
  animate,
  group,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
/**
 * Animates a vertical list of dynamic items. The items will slide in and out of
 * the screen depending on their presence on the list.
 *
 * The trigger `slideInOutList` receives a variable that should change whenever a change on the list
 * is made. For example, you could alternate a boolean's value to trigger the animation, as shown below:
 *
 * **Template:**
 * ```html
 * <ul [@slideInOutList]="animTrigger">
 *  <li *ngFor="..."></li>
 * </ul>
 * ```
 *
 * **Class:**
 * ```ts
 * export class ListComponent {
 *    animTrigger: boolean;
 *    ...
 *    // Whenever a change on the list is made.
 *    this.animTrigger = !this.animTrigger;
 * }
 * ```
 * @param options Variables to control the animation flow
 */
export const slideInOutListTrigger = (options: {
  /**
   * The height in pixels of an item of the list
   */
  itemHeight: number;
  /**
   * The side from the items will slide when entering the list, and where they
   * will slide when leaving the list
   */
  side: 'left' | 'right';
  /**
   * The animation delay in miliseconds between each item. Positive numbers will
   * apply the delay from top to bottom, and negative numbers will apply the
   * delay from bottom to top
   */
  staggerDelay: number;
  /**
   * The animation duration in miliseconds when sliding in and out of the list
   */
  animDuration: number;
}) => {
  const transformToHide =
    options.side === 'left' ? 'translateX(-100%)' : 'translateX(100%)';

  return trigger('slideInOutList', [
    /**
     * The animation should be triggered whenever a change is made in the list.
     */
    transition('* <=> *', [
      group([
        query(
          ':enter',
          [
            /**
             * When entering, initial style should be hidden out of view,
             * independent of the stagger delay.
             */
            style({ height: 0, transform: transformToHide }),
            stagger(
              `${options.staggerDelay}ms`,
              sequence([
                /**
                 * When an item enters, the sequence goes as follows:
                 * - The height goes from 0 to `params.itemHeight`, thus moving
                 *   all of the neighbor items and make space for the entering
                 *   item
                 * - The entering item slides in from the corresponding side
                 */
                animate(
                  `${options.animDuration}ms ease-out`,
                  style({
                    height: `${options.itemHeight}px`,
                    transform: transformToHide,
                  })
                ),
                animate(
                  `${options.animDuration}ms ease-out`,
                  style({
                    transform: 'translateX(0)',
                  })
                ),
              ])
            ),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            stagger(
              `${options.staggerDelay}ms`,
              sequence([
                /**
                 * When an item leaves, the sequence goes as follows:
                 * - The leaving item slides out of view to the corresponding
                 *   side
                 * - The height goes to 0, thus moving the remaining neighbors
                 *   closer together
                 */
                animate(
                  `${options.animDuration}ms ease-out`,
                  style({ transform: transformToHide })
                ),
                animate(
                  `${options.animDuration}ms ease-out`,
                  style({ height: 0 })
                ),
              ])
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]);
};
