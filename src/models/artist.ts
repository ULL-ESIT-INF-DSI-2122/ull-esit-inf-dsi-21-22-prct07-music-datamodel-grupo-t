import {Album} from './album';
import {Group} from './group';
import {Song} from './song';
import {Genre} from './genre';

export class Artist {
  private monthlyListeners: number;

  constructor(private name: string, private groups: Group[] = [], private genres: Genre[] = [],
      private albums: Album[] = [], private publishedSongs: Song[] = []) {
    let listeners = 0;
    this.groups.forEach((group) => {
      listeners += group.getMonthlyListeners();
     });
    // En el caso de que cuenten las reproducciones totales
    //this.publishedSongs.forEach((song) => {
    //  listeners += song.getViews();
    // //})
    this.monthlyListeners = listeners;
  }

  public getName(): string {
    return this.name;
  }

  public getGroups(): Group[] {
    return this.groups;
  }

  public getGenres(): Genre[] {
    return this.genres;
  }

  public getAlbums(): Album[] {
    return this.albums;
  }

  public getPublishedSongs(): Song[] {
    return this.publishedSongs;
  }

  public getMonthlyListeners(): number {
    return this.monthlyListeners;
  }
}