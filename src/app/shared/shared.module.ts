import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {StarRatingComponent} from './components/star-rating/star-rating.component';

const MATERIAL_MODULE = [
  MatSliderModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatDividerModule,
  MatDatepickerModule,
];


@NgModule({
  declarations: [
    StarRatingComponent,
  ],
  imports: [
    CommonModule,
    MATERIAL_MODULE,
  ],
  exports: [
    StarRatingComponent,
    MATERIAL_MODULE,
  ]
})
export class SharedModule { }
