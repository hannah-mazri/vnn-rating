import {MovieAction, MovieActionTypes} from '../actions/movie.action';
import {Movie} from '../models/movie.model';

const initialState: Movie[] = [
  {
    id: 0,
    title: 'Sherlock Holmes',
    rating: 4.5,
    numberOfVotes: 1
  },
  {
    id: 1,
    title: 'End Game',
    rating: 4.8,
    numberOfVotes: 1
  }
];

export function MovieReducer(state: Movie[] = initialState, action: MovieAction) {
  switch (action.type) {
    case MovieActionTypes.RATE_MOVIE:
      return [...state, action.payload];
    default:
      return state;
  }
}
