import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { GenresDTO } from '../models/genre';
import { VideoDTO } from '../models/movie';
import { TvShow, TvShowCredits, TvShowDTO, TvShowImages } from '../models/tvShow';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'd2c7cee95cf9e56b16d431b450b7dc16';

  constructor(private http: HttpClient) { }

  getTvshows(type: string = 'latest', count: number = 6) {
    // console.log(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`);
    
    return this.http.get<TvShowDTO>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`)
                    .pipe(switchMap( ( res ) => {
                      return of(res.results.slice(0, count));
                    }));
  }

  getSimilarTvShows(id: string, count: number) {
    return this.http.get<TvShowDTO>(`${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
                    .pipe(switchMap( (res) => {
                      return of(res.results.slice(0, count));
                    }))
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';
    return this.http.get<TvShowDTO>(`${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`)
                    .pipe(switchMap( ( res ) => {
                      return of(res.results);
                    }));
  }

  getTvShowDetails(id: string){
    return this.http.get<TvShow>(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`);
  }

  getTvShowVideos(id: string) {
    return this.http.get<VideoDTO>(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
                    .pipe(switchMap( ( res ) => {
                      return of(res.results);
                    }));
  }

  getTvShowImages(id: string) {
    return this.http.get<TvShowImages>(`${this.baseUrl}/tv/${id}/images?api_key=${this.apiKey}`)
  }

  getTvShowCredits(id: string) {
    return this.http.get<TvShowCredits>(`${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
  }

  getTvShowGenres() {
    return this.http.get<GenresDTO>(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`)
                    .pipe(switchMap( ( res ) => {
                      return of(res.genres);
                    }));
  }

  getTvShowsByGenre(genreId: string, page: number){
    return this.http.get<TvShowDTO>(`${this.baseUrl}/discover/tv?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`)
                .pipe(switchMap( (res) => {
                  return of(res.results);
                }))
  }

}
