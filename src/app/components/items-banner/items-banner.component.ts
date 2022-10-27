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
  @Input() loading: boolean = true;

  ngOnInit() {
    // console.log(this.items);
  }
  

  responsiveOptions = [
    {
        breakpoint: '1250px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '650px',
        numVisible: 1,
        numScroll: 1
    }
  ];
}

