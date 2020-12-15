import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovieComponent} from './pages/movie.component';
import {SharedModule} from '../shared/shared.module';
import {MovieListComponent} from './components/movie-list.component';
import {MovieRoutingModule} from './movie-routing.module';


@NgModule({
  declarations: [
    MovieComponent,
    MovieListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
