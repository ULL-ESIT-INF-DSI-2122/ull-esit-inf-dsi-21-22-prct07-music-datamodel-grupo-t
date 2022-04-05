import {Genre} from './genre'
import {Song} from './song'

export class Album implements Iterable<Song> {
  private songs: Set<Song>;

  constructor(private name: string, private artist: string = '',
    private year: number = 0, private genres: Genre[] = [], songs: Song[] = []) {
      this.songs = new Set(songs);
  }

  public getName(): string {
    return this.name;
  }

  public getArtist(): string {
    return this.artist;
  }

  public getYear(): number {
    return this.year;
  }

  public getGenres(): Genre[] {
    return this.genres;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setArtist(artist: string): void {
    this.artist = artist;
  }

  public setYear(year: number): void {
    this.year = year;
  }

  public setGenre(genre: Genre[]): void {
    this.genres = genre;
  }

  [Symbol.iterator](): Iterator<Song> {
    return this.songs.values();
  }

  public getSong(name: string): Song | undefined {
    return [...this].find((song) => 
      song.getName() === name);
  }

  public getNumberOfSongs(): number {
    return this.songs.size;
  }

  public addSong(newSong: Song): void {
    this.songs.add(newSong);
  }

  public removeSong(songName: string): void {
    [...this].forEach((song) => {
      if (song.getName() === songName) {
        this.songs.delete(song)
      }
    });
  }
}