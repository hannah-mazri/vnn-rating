import {Action} from '@ngrx/store';
import {Movie} from '../movie.model';


export enum MovieActionTypes {
  LOAD_MOVIE = '[Movie] Load Movie',
  LOAD_MOVIE_SUCCESS = '[Movie] Load Movie Success',
  LOAD_MOVIE_FAILURE = '[Movie] Load Movie Failure',

  RATE_MOVIE = '[Movie] Rate Movie',
  RATE_MOVIE_SUCCESS = '[Movie] Rate Movie Success',
  RATE_MOVIE_FAILURE = '[Movie] Rate Movie Failure',
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

  constructor(public payload: { selectedMovie: Movie, addedRating: number }) {
  }
}
export class RateMovieSuccessAction implements Action {
  readonly type = MovieActionTypes.RATE_MOVIE_SUCCESS;

  constructor(public payload: Movie) {
  }
}
export class RateMovieFailureAction implements Action {
  readonly type = MovieActionTypes.RATE_MOVIE_FAILURE;

  constructor(public payload: Error) {
  }
}

export type MovieAction = LoadMovieAction |
  LoadMovieSuccessAction |
  LoadMovieFailureAction |
  RateMovieAction |
  RateMovieSuccessAction |
  RateMovieFailureAction;
