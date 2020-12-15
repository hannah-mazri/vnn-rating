import { Component, Input, OnInit } from '@angular/core';
import { RateMovieAction } from '../store/movie.action';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  @Input() movies$;
  @Input() loading$;
  @Input() title;

  subscription: Subscription;
  isRandomRating = false;
  newRating = 0;
  step = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onRatingChanged(rating) {
    this.newRating = rating;
  }

  rateMovie(selectedMovie, addedRating) {
    this.store.dispatch(new RateMovieAction({ selectedMovie, addedRating }));
    this.step = null;
  }

  startRandomRate() {
    this.isRandomRating = true;
    this.step = null;

    let movies;
    this.movies$.subscribe((result) => (movies = result));

    this.subscription = interval(1000 + Math.random() * 4000)
      .pipe(
        map(() => {
          const randomIndex = this.getRandomValue(0, 9);
          const randomRating = this.getRandomValue(1, 5);
          const randomMovie = movies[randomIndex];

          this.store.dispatch(
            new RateMovieAction({
              selectedMovie: randomMovie,
              addedRating: randomRating,
            })
          );
        })
      )
      .subscribe();
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
