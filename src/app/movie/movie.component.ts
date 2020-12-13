import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Movie} from '../store/models/movie.model';
import {AppState} from '../store/models/app-state.model';
import {LoadMovieAction, RateMovieAction} from '../store/actions/movie.action';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})

export class MovieComponent implements OnInit {

  movies: Observable<Movie[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.movies = this.store.select(store => store.movie);

    this.store.dispatch(new LoadMovieAction());
     // this.favoriteMovies$ = this.movieService.getFavoriteMovies().pipe(
     //   map(movies => movies.sort((a, b) => b.rating - a.rating))
     // );
  }

  rateMovie(selectedMovie) {
    const newVoteCount = selectedMovie.numberOfVotes + 1;
    // console.log(`current rating is ${selectedMovie.rating}`);
    // console.log(`current number of votes is ${selectedMovie.numberOfVotes}`);
    // console.log(`new vote count is ${newVoteCount}`);
    const newRating = ((((selectedMovie.rating * selectedMovie.numberOfVotes) + 5) / newVoteCount).toFixed(2));
    const copiedList = {...selectedMovie, rating: newRating, numberOfVotes: newVoteCount};
    this.store.dispatch(new RateMovieAction(copiedList));
  }
}
