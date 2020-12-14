import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovieComponent} from './movie.component';
import {CoreModule} from '../core/core.module';
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
