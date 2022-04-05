import {Album} from './album';
import {Artist} from './artist';
import {Genre} from './genre';

export class Group {
  constructor(private name: string, private artists: Artist[] = [], private yearOfCreation: number = 0,
      private relatedGenres: Genre[] = [], private albums: Album[] = [], private monthlyListeners: number = 0) {
  }

  public getName(): string {
    return this.name;
  }

  public getArtists(): Artist[] {
    return this.artists;
  }

  public getYearOfCreation(): number {
    return this.yearOfCreation;
  }

  public getRelatedGenres(): Genre[] {
    return this.relatedGenres;
  }

  public getAlbums(): Album[] {
    return this.albums;
  }

  public getMonthlyListeners(): number {
    return this.monthlyListeners;
  }

  public addArtist(artist: Artist): void {
    this.artists.push(artist);
  }
}