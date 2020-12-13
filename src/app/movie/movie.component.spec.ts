import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MockStore} from "@ngrx/store/testing";
import {Store, StoreModule} from "@ngrx/store";

const favoriteMoviesMock = [
  {
    id: 0,
    title: 'Sherlock Holmes',
    rating: 4.5,
    numberOfVotes: 1
  },
  {
    id: 0,
    title: 'Sherlock Holmes',
    rating: 4.5,
    numberOfVotes: 1
  }
];

describe('MovieListComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ MovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should display a title`, () => {
    const header = fixture.debugElement.queryAll(By.css('h2'));
    expect(header.length).toBe(1);
    expect(header[0].nativeElement.innerHTML).toBe('Movie List');
  });

  it('should display 1 movie', () => {
    const movieElements = fixture.debugElement.queryAll(By.css('.movie'));
    expect(movieElements.length).toBe(1);
  });

  it('should display the movie title', () => {
    const movieElements = fixture.debugElement.queryAll(By.css('.movie'));
    movieElements.forEach((movieElement, index) => {
      expect(movieElement.nativeElement.innerHTML).toContain(favoriteMoviesMock[index].title);
    });
  });

  // it('should sort the movie list from highest to lowest rating', () => {
  //   const movieElements = fixture.debugElement.queryAll(By.css('.movie'));
  //   movieElements.forEach((movieElement, index) => {
  //     expect(movieElement.nativeElement.innerHTML).toContain(favoriteMoviesMock[index].title);
  //   });
  // });
});
