import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-image-header',
  templateUrl: './card-image-header.component.html',
  styleUrls: ['./card-image-header.component.scss'],
})
export class CardImageHeaderComponent implements OnInit {
  @Input() imageSrc!: string;
  @Input() imageAlt!: string;
  @Input() headerTitle!: string;
  constructor() {}

  ngOnInit(): void {}
}
