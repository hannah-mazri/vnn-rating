import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { MovieReducer, MovieState } from '../movie/store/movie.reducer';

export interface AppState {
  readonly movie: MovieState;
}

export const reducers: ActionReducerMap<AppState> = {
  movie: MovieReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
