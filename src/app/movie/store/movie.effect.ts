import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoadMovieAction, LoadMovieFailureAction, LoadMovieSuccessAction, MovieActionTypes} from './movie.action';
import {MovieService} from '../../services/movie.service';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions,
              private movieService: MovieService) {
  }

  @Effect() loadMovies$ = this.actions$.pipe(
    ofType<LoadMovieAction>(MovieActionTypes.LOAD_MOVIE),
    mergeMap(
      () => this.movieService.getFavoriteMovies()
        .pipe(
          map(data => {
            return new LoadMovieSuccessAction(data);
          }),
          catchError(error => of(new LoadMovieFailureAction(error)))
        )
    )
  );
}
