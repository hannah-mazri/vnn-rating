import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Movie} from '../movie/movie.model';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  getFavoriteMovies() {
    return this.http.get<Movie[]>('../assets/movies.json')
      .pipe(
        delay(500)
      );
  }

  rateMovie(selectedMovie, addedRating) {
    const newVoteCount = selectedMovie.numberOfVotes + 1;
    // console.log(`current rating is ${selectedMovie.rating}`);
    // console.log(`current number of votes is ${selectedMovie.numberOfVotes}`);
    // console.log(`new vote count is ${newVoteCount}`);
    const newRating = ((((selectedMovie.rating * selectedMovie.numberOfVotes) + addedRating) / newVoteCount).toFixed(2));
    const copiedList = {...selectedMovie, rating: newRating, numberOfVotes: newVoteCount};

    // console.log('copiedList', copiedList);
    return of(copiedList).pipe(delay(500));
  }
}
