import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mobile!: MediaQueryList;
  isMobile: boolean = false;

  constructor(private media: MediaMatcher) { }

  ngOnInit(): void {
    this.mobile = this.media.matchMedia('(min-width: 490px)');
    this.mobile.addEventListener('change', this.myListener);
  }

  myListener() {
    console.log(this.mobile.matches ? 'mobile':'desktop');
  }


}
