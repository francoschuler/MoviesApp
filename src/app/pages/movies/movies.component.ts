import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Item } from 'src/app/models/item';
import { mapMovieToItem, Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Item[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
              private router: Router) {
               }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe( (params) => {
      if(params['genreId']) {
        this.genreId = params['genreId'];
        this.getMoviesByGenre(params['genreId'], 1);
      }else {
        this.getPagedMovies(1);
      }
    })
   
  }

  getPagedMovies(page: number, searchValue?: string) {
    this.moviesService.searchMovies(page, searchValue)
    .subscribe((movies) => {
      console.log('paged movies', movies);
      
      this.movies = movies.map((movie) => mapMovieToItem(movie));
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page)
    .subscribe((movies) => {
      this.movies = movies.map((movie) => mapMovieToItem(movie));
    })
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      }
    }

  }

  searchMovies() {
    if(this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }


}
