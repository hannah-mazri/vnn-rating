import {Action, createAction, props} from '@ngrx/store';
import {Movie} from '../models/movie.model';


export enum MovieActionTypes {
  LOAD_MOVIE = '[Movie] Load Movie',
  LOAD_MOVIE_SUCCESS = '[Movie] Load Movie Success',
  LOAD_MOVIE_FAILURE = '[Movie] Load Movie Failure',

  RATE_MOVIE = '[Movie] Rate Movie',
  RATE_MOVIE_SUCCESS = '[Movie] Rate Movie Success',
  RATE_MOVIE_FAILURE = '[Movie] Rate Movie Failure',

  STOP_RANDOM_RATE = '[Movie] Stop Random Rate',
  STOP_RANDOM_RATE_SUCCESS = '[Movie] Stop Random Rate Success',
  STOP_RANDOM_RATE_FAILURE = '[Movie] Stop Random Rate Failure',
}

export class LoadMovieAction implements Action {
  readonly type = MovieActionTypes.LOAD_MOVIE;
}
export class LoadMovieSuccessAction implements Action {
  readonly type = MovieActionTypes.LOAD_MOVIE_SUCCESS;

  constructor(public payload: Movie[]) {
  }
}
export class LoadMovieFailureAction implements Action {
  readonly type = MovieActionTypes.LOAD_MOVIE_FAILURE;

  constructor(public payload: Error) {
  }
}

export class RateMovieAction implements Action {
  readonly type = MovieActionTypes.RATE_MOVIE;

  constructor(public payload: Movie) {
  }
}
export class RateMovieSuccessAction implements Action {
  readonly type = MovieActionTypes.RATE_MOVIE_SUCCESS;

  constructor(public payload: Movie[]) {
  }
}
export class RateMovieFailureAction implements Action {
  readonly type = MovieActionTypes.RATE_MOVIE_FAILURE;

  constructor(public payload: Error) {
  }
}

export class StopRandomRateAction implements Action {
  readonly type = MovieActionTypes.STOP_RANDOM_RATE;

  constructor(public payload: Movie) {
  }
}
export class StopRandomRateSuccessAction implements Action {
  readonly type = MovieActionTypes.STOP_RANDOM_RATE_SUCCESS;

  constructor(public payload: Movie[]) {
  }
}
export class StopRandomRateFailureAction implements Action {
  readonly type = MovieActionTypes.STOP_RANDOM_RATE_FAILURE;

  constructor(public payload: Error) {
  }
}

export type MovieAction = LoadMovieAction |
  LoadMovieSuccessAction |
  LoadMovieFailureAction |
  RateMovieAction |
  RateMovieSuccessAction |
  RateMovieFailureAction |
  StopRandomRateAction |
  StopRandomRateSuccessAction |
  StopRandomRateFailureAction;
