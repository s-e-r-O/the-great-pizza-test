import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from '@app/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation],
})
export class AppComponent {
  componentName: string | undefined;
  constructor() {}
  onActivate(outlet: RouterOutlet): void {
    this.componentName = outlet.activatedRoute.routeConfig?.component?.name;
    console.log(this.componentName);
  }

  prepareOutlet(outlet: RouterOutlet): void {
    // console.log(outlet.activatedRoute);
    // console.log(
    //   outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    // );
  }
}
