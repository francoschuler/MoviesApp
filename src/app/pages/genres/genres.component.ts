import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowsService } from 'src/app/services/tvshows.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  movieGenres: Genre[] = [];
  tvshowGenres: Genre[] = [];

  constructor(private moviesService: MoviesService, private tvshowService: TvshowsService) { }

  ngOnInit(): void {
    this.moviesService.getMovieGenres()
                     .subscribe( (genres) => {
                      this.movieGenres = genres;
                     })

    this.tvshowService.getTvShowGenres()
                      .subscribe( (genres) => {
                      this.tvshowGenres = genres;
                      })
  }

}
