import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule} from '@ngrx/store';
import {MovieListComponent} from '../components/movie-list.component';

import {SharedModule} from '../../shared/shared.module';

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

describe('Movie Page', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let store: MockStore;

  const storeMock = jasmine.createSpyObj('Store', ['select']);

  beforeEach(async(() => {

    storeMock.select.and.returnValue(
      of({
        list: [
          {
            id: 0,
            title: 'Sherlock Holmes (2009)',
            description: 'Detective Sherlock Holmes and his stalwart partner Watson engage' +
              'in a battle of wits and brawn with a nemesis whose plot is a threat to all of England.',
            duration: 128,
            rating: 4.5,
            numberOfVotes: 1
          }],
        loading: false,
        error: undefined
      })
    );

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
        StoreModule.forRoot({}, {})
      ],
      declarations: [ MovieComponent, MovieListComponent ],
      providers: [{ provide: Store, useValue: storeMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it(`should have as title '10 MOST WATCHED MOVIES'`, () => {
    expect(component.title).toEqual('10 MOST WATCHED MOVIES');
  });

  // it('should dispatch LoadMovieAction on init', () => {
  //   const action = MovieActionTypes.LOAD_MOVIE;
  //
  //   fixture.detectChanges();
  //
  //   expect(store.dispatch).toHaveBeenCalledWith(action);
  // });
});
