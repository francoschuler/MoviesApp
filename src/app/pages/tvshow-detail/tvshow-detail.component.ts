import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Item } from 'src/app/models/item';
import { mapTvShowToItem, TvShow, TvShowCredits, TvShowImages, TvShowVideo } from 'src/app/models/tvShow';
import { TvshowsService } from 'src/app/services/tvshows.service';

@Component({
  selector: 'app-tvshow-detail',
  templateUrl: './tvshow-detail.component.html',
  styleUrls: ['./tvshow-detail.component.scss']
})
export class TvshowDetailComponent implements OnInit {

  tvshowDetails: TvShow | null = null;
  tvShowBanner: Item | null = null;
  tvshowVideos: TvShowVideo[] = [];
  tvshowImages: TvShowImages | null = null;
  tvshowCredits: TvShowCredits | null = null;
  similarTvshows: Item[] = [];

  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private tvshowsService: TvshowsService) { }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe( ({id}) => {
      this.getTvShowDetail(id);
      this.getTvShowVideos(id);
      this.getTvShowImages(id);
      this.getTvShowCredits(id);
      this.getSimilarTvShows(id);
    });
  }

  getTvShowDetail(id: string) {
    this.tvshowsService.getTvShowDetails(id)
    .subscribe( (tvshow) => {
      console.log('tv show', tvshow);
      this.tvShowBanner = mapTvShowToItem(tvshow);
      this.tvshowDetails = tvshow;
    }, (error:any) => {
      console.log(error);
    });
  }

  getTvShowVideos(id: string) {
    this.tvshowsService.getTvShowVideos(id)
    .subscribe( (videos) => {
      this.tvshowVideos = videos;                
    }, (error:any) => {
      console.log(error);
    });
  }

  getTvShowImages(id: string) {
    this.tvshowsService.getTvShowImages(id)
    .subscribe( (images) => {
      this.tvshowImages = images;                
    }, (error:any) => {
      console.log(error);
    });
  }

  getTvShowCredits(id: string) {
    this.tvshowsService.getTvShowCredits(id)
    .subscribe( (credits) => {
      this.tvshowCredits = credits;                
    }, (error:any) => {
      console.log(error);
    });
  }

  getSimilarTvShows(id: string) {
    this.tvshowsService.getSimilarTvShows(id, 4)
    .subscribe( (tvshows) => {
      this.similarTvshows = tvshows.map((tvshow) => mapTvShowToItem(tvshow));
    }, (error:any) => {
      console.log(error);
    });
  }

}
