import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  getFavoriteSongs(): Observable<any[]> {
    return this.http.get<any[]>('../assets/songs.json');
  }
}
