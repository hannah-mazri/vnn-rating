import {Action, createAction, props} from '@ngrx/store';
import {Movie} from '../models/movie.model';


export enum MovieActionTypes {
  RATE_MOVIE = '[Movie] Rate Movie',
}

export class RateMovieAction implements Action {
  readonly type = MovieActionTypes.RATE_MOVIE;

  constructor(public payload: Movie) {
  }
}

export type MovieAction = RateMovieAction;
