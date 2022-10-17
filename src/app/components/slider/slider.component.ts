import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Item } from 'src/app/models/item';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [animate('1s')]),
      // transition('* => void', [animate('500ms')]),
    ])
  ]
})
export class SliderComponent implements OnInit {

  @Input() items: Item[] = [];
  @Input() isBanner: boolean = false;

  displayDialog: boolean = false;

  imagesSizes = IMAGES_SIZES;

  currentSlideIndex: number = 0;

  mobile!: MediaQueryList;

  constructor(private media: MediaMatcher) { }


  ngOnInit(): void {

    this.mobile = this.media.matchMedia('(min-width: 700px)');
    
    this.mobile.addEventListener('change', this.myListener);

    if(!this.isBanner) {
      setInterval( () => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 5000)
    }
  }

  myListener() {
  }

  showDialog(){ this.displayDialog = true }
}
