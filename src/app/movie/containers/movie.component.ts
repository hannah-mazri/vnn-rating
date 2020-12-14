import {Component, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {Movie} from '../movie.model';
import {LoadMovieAction, RateMovieAction} from '../store/movie.action';
import {AppState} from '../../reducers';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})

export class MovieComponent implements OnInit {

  movies$: Observable<Movie[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  subscription: Subscription;

  isRandomRating = false;
  newRating = 0;
  step = null;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.movies$ = this.store.select(store => store.movie.list);
    this.loading$ = this.store.select(store => store.movie.loading);
    this.error$ = this.store.select(store => store.movie.error);

    this.store.dispatch(new LoadMovieAction());
  }

  onRatingChanged(rating) {
    this.newRating = rating;
  }

  rateMovie(selectedMovie, addedRating) {
    this.store.dispatch(new RateMovieAction({ selectedMovie, addedRating }));
    this.step = null;
  }

  startRandomRate() {
    this.isRandomRating = true;

    let movies;
    this.movies$.subscribe(result => movies = result);

    this.subscription = interval(1000 + (Math.random() * 4000)).pipe(
      map(() => {
        const randomIndex = this.getRandomValue(0, 9);
        const randomRating = this.getRandomValue(1, 5);
        const randomMovie = movies[randomIndex];

        this.store.dispatch(new RateMovieAction({ selectedMovie: randomMovie, addedRating: randomRating }));
      })
    ).subscribe();
  }

  stopRandomRate() {
    this.isRandomRating = false;
    this.subscription.unsubscribe();
  }

  getRandomValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  setStep(index: number) {
    this.step = index;
    this.newRating = null;
  }
}
