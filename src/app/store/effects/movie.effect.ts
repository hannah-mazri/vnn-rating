import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {MovieService} from '../../services/movie.service';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions,
              private movieService: MovieService) {
  }

//   getMovieList$ = createEffect(() => this.actions$.pipe(
//     ofType(MovieActions.loadMovie),
//     switchMap(() => this.movieService.getFavoriteMovies().pipe(
//       map((movies: Movie[]) => MovieActions.getMovieListSuccess({movies})),
//       catchError((error) => of(MovieActions.getMovieListFailure({error})))
//     ))
//   ));
}
