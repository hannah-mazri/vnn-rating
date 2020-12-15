import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovieComponent} from './pages/movie.component';
import {SharedModule} from '../shared/shared.module';
import {MovieListComponent} from './components/movie-list.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    MovieComponent,
    MovieListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class MovieModule { }
