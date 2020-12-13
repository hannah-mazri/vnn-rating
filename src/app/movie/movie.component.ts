import {Component, OnInit} from '@angular/core';
import {interval, Observable} from 'rxjs';
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
  showRandomRateButton = true;

  newRating = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.movies = this.store.select(store => store.movie);

    this.store.dispatch(new LoadMovieAction());
  }

  // todo: highlight card on rated movie
  rateMovie(selectedMovie, addedRating) {
    const newVoteCount = selectedMovie.numberOfVotes + 1;
    // console.log(`current rating is ${selectedMovie.rating}`);
    // console.log(`current number of votes is ${selectedMovie.numberOfVotes}`);
    // console.log(`new vote count is ${newVoteCount}`);
    const newRating = ((((selectedMovie.rating * selectedMovie.numberOfVotes) + addedRating) / newVoteCount).toFixed(2));
    const copiedList = {...selectedMovie, rating: newRating, numberOfVotes: newVoteCount};
    this.store.dispatch(new RateMovieAction(copiedList));
  }

  startRandomRate() {
    this.showRandomRateButton = false;
    let randomMovie;
    const randomIndex = this.getRandomValue(0, 9);
    this.movies.subscribe((x) => randomMovie = x[randomIndex]);

    /*
    1. const randomMovie = movies[ __randomIndexFromZeroToNine__ ]

    2. const newVoteCount = randomMovie.numberOfVotes + 1

    3. const newRating = (((randomMovie.rating * randomMovie.numberOfVotes) + __randomRatingFromOneToFive__ ) / newVoteCount).toFixed(2)
     */

    // const newVoteCount = randomMovie.numberOfVotes + 1;
    // const newRating = (((randomMovie.rating * randomMovie.numberOfVotes) + 5) / newVoteCount).toFixed(2);
    // const copiedList = {...randomMovie, rating: newRating, numberOfVotes: newVoteCount};
    // this.store.dispatch(new RateMovieAction(copiedList));
  }

  stopRandomRate() {
    this.showRandomRateButton = true;
  }

  getRandomValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  onRatingChanged(rating) {
    console.log(rating);
    this.newRating = rating;
  }
}
