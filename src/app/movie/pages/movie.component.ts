import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Movie } from '../movie.model';
import { LoadMovieAction, RateMovieAction } from '../store/movie.action';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  title = '10 MOST WATCHED MOVIES';

  movies$: Observable<Movie[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.movies$ = this.store.select((store) => store.movie.list);
    this.loading$ = this.store.select((store) => store.movie.loading);
    this.error$ = this.store.select((store) => store.movie.error);

    this.store.dispatch(new LoadMovieAction());
  }
}
