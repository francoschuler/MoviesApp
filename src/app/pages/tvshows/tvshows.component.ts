import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Item } from 'src/app/models/item';
import { mapTvShowToItem, TvShow } from 'src/app/models/tvShow';
import { TvshowsService } from 'src/app/services/tvshows.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent implements OnInit {

  tvShows: Item[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private tvshowsService: TvshowsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe( (params) => {
      if(params['genreId']) {
        this.genreId = params['genreId'];
        this.getTvshowsByGenre(params['genreId'], 1);
      }else {
        this.getPagedTvshows(1);
      }
    })
   
  }

  getPagedTvshows(page: number, searchValue?: string) {
    this.tvshowsService.searchTvShows(page, searchValue)
    .subscribe((tvshows) => {      
      this.tvShows = tvshows.map((tvshow) =>  mapTvShowToItem (tvshow) );
    });
  }

  getTvshowsByGenre(genreId: string, page: number) {
    this.tvshowsService.getTvShowsByGenre(genreId, page)
    .subscribe((tvshows) => {
      this.tvShows = tvshows.map((tvshow) =>  mapTvShowToItem (tvshow) );
    })
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getTvshowsByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedTvshows(pageNumber, this.searchValue);
      }
    }

  }

  searchMovies() {
    if(this.searchValue) {
      this.getPagedTvshows(1, this.searchValue);
    }
  }


}
