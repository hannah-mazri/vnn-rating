import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Movie } from '../movie/movie.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getFavoriteMovies() {
    return this.http.get<Movie[]>('../assets/movies.json');
  }

  rateMovie(selectedMovie, addedRating) {
    const newVoteCount = selectedMovie.numberOfVotes + 1;
    const newRating = ((selectedMovie.rating * selectedMovie.numberOfVotes + addedRating) / newVoteCount).toFixed(2);
    const copiedList = {
      ...selectedMovie,
      rating: newRating,
      numberOfVotes: newVoteCount,
    };

    return of(copiedList).pipe(delay(1500));
  }
}
