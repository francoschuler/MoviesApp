import { Component, HostListener, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mobile!: MediaQueryList;
  isMobile: boolean = false;
  display: boolean = false;
  isSticky: boolean = false;

  constructor(private media: MediaMatcher) { }

  ngOnInit(): void {
    this.mobile = this.media.matchMedia('(max-width: 875px)');
    this.mobile.addEventListener('change', this.myListener);
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  myListener() {
    console.log(this.mobile.matches ? 'mobile':'desktop');
  }
}
