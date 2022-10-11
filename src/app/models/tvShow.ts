
import { Genre } from './genre';
import { Item } from './item';

export interface TvShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  revenue: number;
  runtime: number;
  status: string;
  genres: Genre[];
}

export interface TvShowDTO {
  page: number;
  results: TvShow[];
  total_results: number;
  total_pages: number;
}

export interface TvShowVideoDTO {
  id: number;
  results: TvShowVideo[];
}

export interface TvShowVideo {
  site: string;
  key: string;
}

export interface TvShowImages {
  backdrops: {
    file_path: string;
  }[];
}

export interface TvShowCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}

export const mapTvShowToItem = (tvShow: TvShow): Item => {
  return {
    id: tvShow.id,
    title: tvShow.name,
    poster_path: tvShow.poster_path,
    vote_average: tvShow.vote_average,
    backdrop_path: tvShow.backdrop_path,
    vote_count: tvShow.vote_count,
    release_date: tvShow.release_date,
    overview: tvShow.overview,
    route_path: '/tvshow-detail/' + tvShow.id
  };
};