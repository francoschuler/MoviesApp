import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { mapMovieToItem, Movie } from 'src/app/models/movie';
import { mapTvShowToItem, TvShow } from 'src/app/models/tvShow';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowsService } from 'src/app/services/tvshows.service';

const numMovies = 12;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  upcomingMovies: Item[] = [];
  popularMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  popularTvshows: Item[] = [];
  loading: boolean = true;


  constructor(private moviesService: MoviesService,
              private tvshowsService: TvshowsService) { }
              

   delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
   }
   
   ngOnInit(): void {
      this.moviesService.getMovies('popular', numMovies)
         .subscribe( (movies) => {
            this.delay(3000);
            this.popularMovies = movies.map((movie) => mapMovieToItem(movie));
            this.loading = false;
            // console.log('popular', this.popularMovies);
         }, (error:any) => {
               console.log(error);
         });

      this.moviesService.getMovies('top_rated', numMovies)
      .subscribe( (movies) => {
         this.delay(3000);
         this.topRatedMovies = movies.map((movie) => mapMovieToItem(movie));
         this.loading = false;
      }, (error:any) => {
      console.log(error);
      });

      this.moviesService.getMovies('upcoming', numMovies)
      .subscribe( (movies) => {
         this.delay(3000);
         this.upcomingMovies = movies.map((movie) => mapMovieToItem(movie));
         this.loading = false;

         // console.log('upcoming', this.popularMovies);
      }, (error:any) => {
      console.log(error);
      });

      this.tvshowsService.getTvshows('popular', numMovies)
      .subscribe( (tvshows) => {
         this.delay(3000);
         this.popularTvshows = tvshows.map((tvshow) => mapTvShowToItem(tvshow));
         this.loading = false;
         console.log('debug', this.popularTvshows);
         
      }, (error:any) => {
      console.log(error);
      });
  }

}
