import {Song} from './song';
import {Genre} from './genre';

export class PlayList {
  constructor(private name: string, private songs: Song[],
      private duration: number, private genres: Genre[]) {
  }

  public getName(): string {
    return this.name;
  }

  public getSongs(): Song[] {
    return this.songs;
  }

  public getDuration(): number {
    return this.duration;
  }

  public getGenres(): Genre[] {
    return this.genres;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setGenres(genres: Genre[]): void {
    this.genres = genres;
  }

  public addSong(song: Song): void {
    this.songs.push(song);
  }

  public addGenre(genre: Genre): void {
    this.genres.push(genre);
  }

  public removeSong(songName: string): void {
    this.songs.forEach((song, index) => {
      if (song.getName() === songName) {
        this.songs.splice(index, 1);
      }
    });
  }

  public removeGenre(newGenre: Genre): void {
    this.genres.forEach((genre, index) => {
      if (genre === newGenre) {
        this.genres.splice(index, 1);
      }
    });
  }

  public getNumberOfSongs(): number {
    return this.songs.length;
  }
}