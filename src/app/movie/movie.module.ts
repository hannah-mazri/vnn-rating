import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovieComponent} from './containers/movie.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    MovieComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MovieModule { }
