import {MovieAction, MovieActionTypes} from './movie.action';
import {Movie} from '../movie.model';

export interface MovieState {
  list: Movie[];
  loading: boolean;
  error: Error;
}

const initialState: MovieState = {
  list: [],
  loading: false,
  error: undefined,
};

export function MovieReducer(state: MovieState = initialState, action: MovieAction) {
  switch (action.type) {
    case MovieActionTypes.LOAD_MOVIE:
      // return [...state.list].sort(((a, b) => b.rating - a.rating));
      return {
        ...state,
        loading: true,
      };
    case MovieActionTypes.LOAD_MOVIE_SUCCESS:
      return {
        ...state,
        list: [...action.payload].sort(((a, b) => b.rating - a.rating)),
        loading: false,
      };
    case MovieActionTypes.LOAD_MOVIE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case MovieActionTypes.RATE_MOVIE:
      const idx = state.list.findIndex(item => item.id === action.payload.id);
      const newRating = [...state.list.slice(0, idx), action.payload, ...state.list.slice(idx + 1)];
      return {
        ...state,
        list: newRating.sort((a, b) => b.rating - a.rating),
        loading: true,
      };
    default:
      return state;
  }
}
