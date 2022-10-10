import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie, MovieCredits, MovieDTO, MovieImages, VideoDTO } from '../models/movie';
import { of, switchMap } from 'rxjs';
import { GenresDTO } from '../models/genre';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'd2c7cee95cf9e56b16d431b450b7dc16';

  constructor(private http: HttpClient) { }

  getMovies(type: string = 'upcoming', count: number = 6) {
    return this.http.get<MovieDTO>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`)
                    .pipe(switchMap( ( res ) => {
                      return of(res.results.slice(0, count));
                    }));
  }

  getSimilarMovies(id: string, count: number) {
    return this.http.get<MovieDTO>(`${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}`)
                    .pipe(switchMap( (res) => {
                      return of(res.results.slice(0, count));
                    }))
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/movie' : '/movie/popular';
    return this.http.get<MovieDTO>(`${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`)
                    .pipe(switchMap( ( res ) => {
                      return of(res.results);
                    }));
  }

  getMovieDetails(id: string){
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: string) {
    return this.http.get<VideoDTO>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
                    .pipe(switchMap( ( res ) => {
                      return of(res.results);
                    }));
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`)
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
  }

  getMovieGenres() {
    return this.http.get<GenresDTO>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
                    .pipe(switchMap( ( res ) => {
                      return of(res.genres);
                    }));
  }

  getMoviesByGenre(genreId: string, page: number){
    return this.http.get<MovieDTO>(`${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`)
                .pipe(switchMap( (res) => {
                  return of(res.results);
                }))
  }


}
