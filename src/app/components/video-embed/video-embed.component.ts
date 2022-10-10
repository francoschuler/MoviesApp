import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit {


  @Input() site: string = "YouTube";
  @Input() key: string | null = null;
  @Input() url: SafeResourceUrl = "";

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.url = this.site === "YouTube" ? this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.key) : this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + this.key)

    switch(this.site){
      case 'YouTube':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.key);
        break;
      case 'Vimeo':
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/' + this.key);
        break;
      default: break;

    }
  }

}
