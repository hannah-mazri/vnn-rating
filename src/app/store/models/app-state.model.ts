import {Movie} from './movie.model';

export interface AppState {
  readonly movie: Movie[];
}
