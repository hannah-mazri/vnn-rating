import {Component, OnInit} from '@angular/core';
import {interval, Observable, of, timer} from 'rxjs';
import {Store} from '@ngrx/store';
import {Movie} from '../store/models/movie.model';
import {AppState} from '../store/models/app-state.model';
import {LoadMovieAction, RateMovieAction} from '../store/actions/movie.action';
import {map, take, takeUntil, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})

export class MovieComponent implements OnInit {

  movies: Observable<Movie[]>;
  loading$: Observable<Boolean> = of(false);
  showRandomRateButton = true;
  randomIndex;


  newRating = 0;

  step = null;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.movies = this.store.select(store => store.movie);

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
    const timer$ = timer(10000);
    let randomMovie;
    let randomRating;
    let myMovies;

    this.movies.subscribe(result => myMovies = result);

    const myObservable = interval(1000 + (Math.random() * 4000)).pipe(
      takeUntil(timer$),
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
    );

    myObservable.subscribe();


    this.showRandomRateButton = false;
    // this.loading$ = of(true);
    // let randomMovie;
    // const randomIndex = this.getRandomValue(0, 9);
    // this.movies.subscribe((x) => randomMovie = x[randomIndex]);

    // console.log('random', randomMovie);
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
    // this.loading$ = of(false);
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
