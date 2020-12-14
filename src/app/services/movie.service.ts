import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../movie/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  getFavoriteMovies() {
    return this.http.get<Movie[]>('../assets/movies.json');
  }

  // rateMovie(selectedMovie) {
    // let newVoteCount = selectedMovie.numberOfVotes + 1;
    // let newRating = (((selectedMovie.rating * selectedMovie.numberOfVotes) + 5) / newVoteCount).toFixed(1);
    // let copiedList = {...selectedMovie, rating: newRating, numberOfVotes: newVoteCount};

    // return {};
  // }
}
