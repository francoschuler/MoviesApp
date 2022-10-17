import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tvShow';

@Component({
  selector: 'app-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent implements OnInit {

  @Input() items: Item[] = [];
  @Input() title: string = "";

  ngOnInit() {
    console.log(this.items);
  }

  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
  ];
}

