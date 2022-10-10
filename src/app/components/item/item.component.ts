import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { TvShow } from 'src/app/models/tvShow';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {


  @Input() itemData : Item | null = null;

  readonly imagesSizes = IMAGES_SIZES;
  


}
