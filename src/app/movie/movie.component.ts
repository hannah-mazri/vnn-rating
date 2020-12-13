import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {Movie} from '../store/models/movie.model';
import {AppState} from '../store/models/app-state.model';
import { v4 as uuid } from 'uuid';
import {RateMovieAction} from '../store/actions/movie.action';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})

export class MovieComponent implements OnInit {

  movies: Observable<Movie[]>;
  newMovie: Movie = { id: null, title: '', rating: null, numberOfVotes: 0 };

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.movies = this.store.select(store => store.movie);
     // this.favoriteMovies$ = this.movieService.getFavoriteMovies().pipe(
     //   map(movies => movies.sort((a, b) => b.rating - a.rating))
     // );
  }

  rateMovie(selectedMovie) {
    const newVoteCount = selectedMovie.numberOfVotes + 1;
    const newRating = (((selectedMovie.rating * selectedMovie.numberOfVotes) + 5) / newVoteCount).toFixed(1);
    const copiedList = {...selectedMovie, rating: newRating, numberOfVotes: newVoteCount};
    console.log('copiedList', copiedList);
    this.store.dispatch(new RateMovieAction(copiedList));
  }
}
