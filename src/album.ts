import {GenreName} from './genre'
import {Song} from './song'

class Album implements Iterable<Song> {
  constructor(private name: string, private artist: string,
    private year: number, private genre: GenreName, private songs: Set<Song>) {
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

  public getGenre(): GenreName {
    return this.genre;
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

  public setGenre(genreName: GenreName): void {
    this.genre = genreName;
  }

  [Symbol.iterator](): Iterator<Song> {
    return this.songs.values();
  }

  public getSong(name: string) {
    return [...this.songs.values()].find((song) => 
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