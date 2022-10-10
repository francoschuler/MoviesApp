import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { mapMovieToItem, Movie } from 'src/app/models/movie';
import { mapTvShowToItem, TvShow } from 'src/app/models/tvShow';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowsService } from 'src/app/services/tvshows.service';

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

  constructor(private moviesService: MoviesService, private tvshowsService: TvshowsService) { }

  ngOnInit(): void {
      this.moviesService.getMovies('popular')
         .subscribe( (movies) => {
            this.popularMovies = movies.map((movie) => mapMovieToItem(movie));
         }, (error:any) => {
               console.log(error);
         });

      this.moviesService.getMovies('top_rated')
      .subscribe( (movies) => {
         this.topRatedMovies = movies.map((movie) => mapMovieToItem(movie));
      }, (error:any) => {
      console.log(error);
      });

      this.moviesService.getMovies('upcoming')
      .subscribe( (movies) => {
         this.upcomingMovies = movies.map((movie) => mapMovieToItem(movie));
      }, (error:any) => {
      console.log(error);
      });

      this.tvshowsService.getTvshows('popular')
      .subscribe( (tvshows) => {
         this.popularTvshows = tvshows.map((tvshow) => mapTvShowToItem(tvshow));
         console.log('debug', this.popularTvshows);
         
      }, (error:any) => {
      console.log(error);
      });
  }



}
