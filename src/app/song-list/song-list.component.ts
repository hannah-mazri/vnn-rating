import { Component, OnInit } from '@angular/core';
import {SongService} from '../services/song.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  favoriteSongs$: Observable<any[]>;

  constructor(private songService: SongService) { }

  ngOnInit() {
     this.favoriteSongs$ = this.songService.getFavoriteSongs().pipe(
       map(songs => songs.sort((a, b) => b.rating - a.rating))
     );
  }
}
