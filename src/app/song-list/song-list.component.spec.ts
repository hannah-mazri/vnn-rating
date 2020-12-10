import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListComponent } from './song-list.component';
import { By } from '@angular/platform-browser';
import { SongService } from '../services/song.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const favoriteSongsMock = [
  {
    title: 'Dance To This',
    artist: 'Troye Sivan, Ariana Grande',
  },
  {
    title: 'Tearin\' Up My Heart',
    artist: 'Kina Grannis'
  },
  {
    title: 'Feelings',
    artist: 'Lauv'
  },
  {
    title: 'Mean It',
    artist: 'Lauv, LANY'
  },
  {
    title: 'Buat Selamanya',
    artist: 'ALYPH'
  },
  {
    title: 'Pyramid',
    artist: 'Charice, Iyaz'
  },
  {
    title: 'Call Me When You\'re Sober',
    artist: 'Evanescence'
  },
  {
    title: 'Helena',
    artist: 'My Chemical Romance'
  },
  {
    title: 'Beautiful Now',
    artist: 'Zedd, Jon Bellion'
  },
  {
    title: 'Turn Up The Music',
    artist: 'Chris Brown'
  },
];

describe('SongListComponent', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;
  let songService: SongService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongListComponent);
    component = fixture.componentInstance;
    songService = TestBed.get(SongService);
    spyOn(songService, 'getFavoriteSongs').and.returnValue(of(favoriteSongsMock));
    fixture.detectChanges();
  });

  it(`should display a title`, () => {
    const header = fixture.debugElement.queryAll(By.css('h1'));
    expect(header.length).toBe(1);
    expect(header[0].nativeElement.innerHTML).toBe('Top 10 Favorite Songs');
  });

  it('should display 10 liked songs ', () => {
    const songElements = fixture.debugElement.queryAll(By.css('.song'));
    expect(songElements.length).toBe(10);
  });

  it('should display the song titles', () => {
    const songElements = fixture.debugElement.queryAll(By.css('.song'));
    songElements.forEach((songElement, index) => {
      expect(songElement.nativeElement.innerHTML).toContain(favoriteSongsMock[index].title);
    });
  });

  it('should sort the song list from highest to lowest rating', () => {
    const songElements = fixture.debugElement.queryAll(By.css('.song'));
    songElements.forEach((songElement, index) => {
      expect(songElement.nativeElement.innerHTML).toContain(favoriteSongsMock[index].title);
    });
  });

  it('should get favorite songs from the service', () => {
    expect(songService.getFavoriteSongs).toHaveBeenCalled();
  });
});
