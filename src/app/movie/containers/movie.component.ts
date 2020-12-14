import {Component, OnInit} from '@angular/core';
import {interval, Observable, of, Subject, Subscription, timer} from 'rxjs';
import {Store} from '@ngrx/store';
import {map, take, takeUntil, takeWhile} from 'rxjs/operators';
import {Movie} from '../movie.model';
import {LoadMovieAction, RateMovieAction} from '../store/movie.action';
import {AppState} from '../../reducers';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})

export class MovieComponent implements OnInit {

  movies: Observable<Movie[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>;

  showRandomRateButton = true;
  randomIndex;

  newRating = 0;
  step = null;
  subscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.movies = this.store.select(store => store.movie.list);
    this.loading$ = this.store.select(store => store.movie.loading);
    this.error$ = this.store.select(store => store.movie.error);

    this.store.dispatch(new LoadMovieAction());
  }

  // todo: highlight card on rated movie

  onRatingChanged(rating) {
    console.log(rating);
    this.newRating = rating;
  }

  rateMovie(selectedMovie, addedRating) {
    const newVoteCount = selectedMovie.numberOfVotes + 1;
    // console.log(`current rating is ${selectedMovie.rating}`);
    // console.log(`current number of votes is ${selectedMovie.numberOfVotes}`);
    // console.log(`new vote count is ${newVoteCount}`);
    const newRating = ((((selectedMovie.rating * selectedMovie.numberOfVotes) + addedRating) / newVoteCount).toFixed(2));
    const copiedList = {...selectedMovie, rating: newRating, numberOfVotes: newVoteCount};
    this.store.dispatch(new RateMovieAction(copiedList));

    this.step = null;
  }

  startRandomRate() {
    this.showRandomRateButton = false;

    let randomMovie;
    let randomRating;
    let myMovies;

    this.movies.subscribe(result => myMovies = result);

    this.subscription = interval(1000 + (Math.random() * 4000)).pipe(
      map(() => {
        this.randomIndex = this.getRandomValue(0, 9);
        randomRating = this.getRandomValue(1, 5);

        console.log('rand', this.randomIndex);

        randomMovie = myMovies[this.randomIndex];
        const newVoteCount = randomMovie.numberOfVotes + 1;
        const newRating = (((randomMovie.rating * randomMovie.numberOfVotes) + randomRating) / newVoteCount).toFixed(2);
        const copiedList = {...randomMovie, rating: newRating, numberOfVotes: newVoteCount};
        this.store.dispatch(new RateMovieAction(copiedList));
        console.log('random movie', randomMovie);
        console.log('random rating', randomRating);
        console.log('copiedList', copiedList);
      })
    ).subscribe();
  }

  stopRandomRate() {
    this.subscription.unsubscribe();
    this.showRandomRateButton = true;
  }

  getRandomValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  setStep(index: number) {
    this.step = index;
    this.newRating = null;
  }
}
