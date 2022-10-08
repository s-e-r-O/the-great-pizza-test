import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from '@app/animations';
import { AnimationEvent } from '@angular/animations';
@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [routeAnimation],
})
export class ContentLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  prepareOutlet(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRoute.snapshot.params.id;
  }
  onAnimationEvent(event: AnimationEvent) {}
}
