import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tvShow';

@Component({
  selector: 'app-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {

  @Input() items: Item[] = [];
  @Input() title: string = "";
}
