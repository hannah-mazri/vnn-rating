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
    title: 'Avengers: Endgame',
    rating: 4.8,
    numberOfVotes: 1
  },
  {
    id: 2,
    title: 'Star Wars: The Force Awakens',
    rating: 4.4,
    numberOfVotes: 1
  },
  {
    id: 3,
    title: 'Skyfall',
    rating: 4.6,
    numberOfVotes: 1
  },
  {
    id: 4,
    title: 'Interstellar',
    rating: 4.6,
    numberOfVotes: 1
  },
  {
    id: 5,
    title: 'Knives Out',
    rating: 4.8,
    numberOfVotes: 1
  },
  {
    id: 6,
    title: 'Knives Out',
    rating: 4.8,
    numberOfVotes: 1
  },
  {
    id: 7,
    title: 'Thor: Ragnarok',
    rating: 4.8,
    numberOfVotes: 1
  },
  {
    id: 8,
    title: 'Gattaca',
    rating: 4.7,
    numberOfVotes: 1
  },
  {
    id: 8,
    title: 'Gattaca',
    rating: 4.7,
    numberOfVotes: 1
  },
  {
    id: 9,
    title: 'Men in Black: International',
    rating: 4.4,
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
