import {Song, Duration} from './song';
import {Genre, GenreName} from './genre';

/**
 * An interface that defines simple data for a playlist
 */
export interface PlaylistInterface {
  name: string;
  songs: string[];
  duration: {minutes: number, seconds: number};
  genres: GenreName[];
}

/**
 * Playlist class
 */
export class PlayList {
  /**
   * Constructor
   * @param name of the playlist
   * @param songs of the playlist
   * @param duration of the playlist
   * @param genres of the songs of the playlist
   */
  constructor(private name: string, private songs: Song[] = [],
      private duration: Duration = {minutes: 0, seconds: 0},
      private genres: Genre[] = []) {
  }

  /**
   * @returns the name of the playlist
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns the set of songs of the playlist
   */
  public getSongs(): Song[] {
    return this.songs;
  }

  /**
   * @returns the duration of the playlist
   */
  public getDuration(): Duration {
    return this.duration;
  }

  /**
   * @returns the genres that belong to the playlist
   */
  public getGenres(): Genre[] {
    return this.genres;
  }

  /**
   * Changes de name of the playlist
   * @param name that will be updated
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Changes de genres of the playlist
   * @param genres that will be updated
   */
  public setGenres(genres: Genre[]): void {
    this.genres = genres;
  }

  /**
   * Adds a song to the playlist
   * @param song that will be added
   */
  public addSong(song: Song): void {
    this.songs.push(song);
  }

  /**
   * Adds a genre to the playlist
   * @param genre that will be added
   */
  public addGenre(genre: Genre): void {
    this.genres.push(genre);
  }

  /**
   * Removes a song from the playlist
   * @param songName that will be removed
   */
  public removeSong(songName: string): void {
    this.songs.forEach((song, index) => {
      if (song.getName() === songName) {
        this.songs.splice(index, 1);
      }
    });
  }

  /**
   * Removes a genre from the playlist
   * @param newGenre that will be removed
   */
  public removeGenre(newGenre: Genre): void {
    this.genres.forEach((genre, index) => {
      if (genre === newGenre) {
        this.genres.splice(index, 1);
      }
    });
  }

  /**
   * @returns the number of songs of the playlist
   */
  public getNumberOfSongs(): number {
    return this.songs.length;
  }

  /**
   * Returns the information of the playlist as a string
   */
   public asString(): string {
    let genresString = '';
    this.genres.forEach(genre => {
      genresString += `${genre.getName()} `;
    });
    let duration = `${Math.floor(this.duration.minutes / 60)} h ` + 
      `${this.duration.minutes % 60} min ${this.duration.seconds} seg`;
    let numberOfSongs = this.songs.length;
    let formatedPlaylist = `${this.name} - Duration: ${duration}, ` +
      `${numberOfSongs} Songs, Genres: ${genresString}`;

      return formatedPlaylist;
  }

  /**
   * Returns true if a certain song is in the playlist
   * @param songName 
   */
  public isSong(songName: string): boolean {
    let isSong = false;
    this.songs.forEach(song => {
      if (song.getName() === songName) {
        isSong = true;
      }
    });
    return isSong;
  }
}