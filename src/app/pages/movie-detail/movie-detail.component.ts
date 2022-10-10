import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  movieDetail: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];

  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe( ({id}) => {
      this.getMovieDetail(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }

  ngOnDestroy(): void {
    
  }

  getMovieDetail(id: string) {
    this.moviesService.getMovieDetails(id)
    .subscribe( (movie) => {
      console.log(movie);
      this.movieDetail = movie;
    }, (error:any) => {
      console.log(error);
    });
  }

  getMovieVideos(id: string) {
    this.moviesService.getMovieVideos(id)
    .subscribe( (videos) => {
      this.movieVideos = videos;                
    }, (error:any) => {
      console.log(error);
    });
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id)
    .subscribe( (images) => {
      this.movieImages = images;                
    }, (error:any) => {
      console.log(error);
    });
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id)
    .subscribe( (images) => {
      this.movieCredits = images;                
    }, (error:any) => {
      console.log(error);
    });
  }

  getSimilarMovies(id: string) {
    this.moviesService.getSimilarMovies(id, 4)
    .subscribe( (movies) => {
      this.similarMovies = movies;
    }, (error:any) => {
      console.log(error);
    });
  }

}
