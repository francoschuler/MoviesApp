import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './pages/genres/genres.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvshowDetailComponent } from './pages/tvshow-detail/tvshow-detail.component';
import { TvshowsComponent } from './pages/tvshows/tvshows.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/genres/:genreId', component: MoviesComponent },
  { path: 'movie-detail/:id', component: MovieDetailComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'tvshows', component: TvshowsComponent },
  { path: 'tvshows/genres/:genreId', component: TvshowsComponent },
  { path: 'tvshow-detail/:id', component: TvshowDetailComponent },
  { path: 'genres', component: GenresComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
