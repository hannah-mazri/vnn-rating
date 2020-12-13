// import {Actions, createEffect, ofType} from '@ngrx/effects';
// import {Injectable} from '@angular/core';
// import {MovieService} from '../services/movie.service';
// import * as MovieActions from './actions/movie.action';
// import {catchError, map, switchMap} from 'rxjs/operators';
// import {Movie} from './models/movie.model';
// import {of} from 'rxjs';
//
// @Injectable()
// export class MovieEffects {
//   constructor(private actions$: Actions,
//               private movieService: MovieService) {
//   }
//
//
//   getMovieList$ = createEffect(() => this.actions$.pipe(
//     ofType(MovieActions.loadMovie),
//     switchMap(() => this.movieService.getFavoriteMovies().pipe(
//       map((movies: Movie[]) => MovieActions.getMovieListSuccess({movies})),
//       catchError((error) => of(MovieActions.getMovieListFailure({error})))
//     ))
//   ));
// }
