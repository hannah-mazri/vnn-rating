import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, concatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  LoadMovieAction,
  LoadMovieFailureAction,
  LoadMovieSuccessAction,
  MovieActionTypes,
  RateMovieAction, RateMovieFailureAction, RateMovieSuccessAction
} from './movie.action';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../movie.model';

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

  @Effect() rateMovie$ = this.actions$.pipe(
    ofType<RateMovieAction>(MovieActionTypes.RATE_MOVIE),
    map((action: RateMovieAction) => action.payload),
    switchMap(payload => this.movieService.rateMovie(payload.selectedMovie, payload.addedRating)
      .pipe(
        concatMap((movie: Movie) => [
          new RateMovieSuccessAction(movie),
        ]),
        catchError(error => of(new RateMovieFailureAction(error)))
      )),
  );
}
