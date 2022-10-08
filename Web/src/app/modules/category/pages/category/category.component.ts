import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { slideInOutList } from '@app/animations';
import { CategoryDataService, DishDataService } from '@data/services';
import { Category, Dish } from '@data/types/models';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    slideInOutList({
      itemHeight: 150,
      side: 'right',
      staggerDelay: 50,
      animDuration: 500,
    }),
  ],
})
export class CategoryComponent implements OnInit {
  items$: Observable<Dish[]>;
  category$: Observable<Category | undefined>;
  constructor(
    private route: ActivatedRoute,
    private categoryDataService: CategoryDataService,
    private dishDataService: DishDataService,
    private titleService: Title
  ) {
    this.category$ = this.route.params.pipe(
      switchMap((params) => {
        return this.categoryDataService
          .getById(params.id)
          .pipe(tap((c) => this.titleService.setTitle(`Menu - ${c!.title}`)));
      })
    );
    this.items$ = this.route.params.pipe(
      switchMap((params) => {
        return this.dishDataService.getAllByCategoryId(params.id);
      })
    );
  }

  ngOnInit(): void {}

  trackByFn(index: number, dish: Dish): string {
    return dish.title;
  }
}
