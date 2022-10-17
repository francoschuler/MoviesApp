import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService, private router: Router) { 

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

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


  navigateSameUrl(id: number){
    this.router.navigate(['movie-detail', String(id)])
  }

}
