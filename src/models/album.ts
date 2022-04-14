import {Genre, GenreName} from './genre';
import {Song} from './song';

/**
 * An Album interface that defines simple data attributes for an Album
 */
export interface AlbumInterface {
  name: string;
  artists: string;
  year: number;
  genres: GenreName[];
  songs: string[];
}

/**
 * Album class. It's a set of songs stored that have the same group or
 * artist in common. 
 */
export class Album implements Iterable<Song> {
  private songs: Set<Song>;

  /**
   * Constructor
   * @param name name of the album
   * @param artist artist who made the album
   * @param year year the album had realeased
   * @param genres genres the album has in it's songs
   * @param songs songs that the album has
   */
  constructor(private name: string, private artist: string = '',
    private year: number = 0, private genres: Genre[] = [], songs: Song[] = []) {
    this.songs = new Set(songs);
  }

  /**
   * @returns the name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns the artists
   */
  public getArtist(): string {
    return this.artist;
  }

  /**
   * @returns the year the album had realeased
   */
  public getYear(): number {
    return this.year;
  }

  /**
   * @returns the genres that the album has in it
   */
  public getGenres(): Genre[] {
    return this.genres;
  }

  /**
   * @returns the set of songs that compose the album
   */
  public getSongs(): Set<Song> {
    return this.songs;
  }

  /**
   * Set's a new name to the album
   * @param name value of the new name
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Set's a new artist as owner of the album
   * @param artist value of the new artist
   */
  public setArtist(artist: string): void {
    this.artist = artist;
  }

  /**
   * Set's a new value to the year that the album had realeased
   * @param year value of the new year
   */
  public setYear(year: number): void {
    this.year = year;
  }

  /**
   * Set's a new value genres that the album has 
   * @param genres value of the new genres
   */
  public setGenre(genres: Genre[]): void {
    this.genres = genres;
  }

  /**
   * Function that is responsible for returning the list of values to iterate on.
   * @returns every single 
   */
  [Symbol.iterator](): Iterator<Song> {
    return this.songs.values();
  }

  /**
   * Search a song by it's name and returns it
   * @param name of the song to search
   * @returns the song or undefinded if the song isn't in the album
   */
  public getSong(name: string): Song | undefined {
    return [...this].find((song) => 
      song.getName() === name);
  }

  /**
   * @returns the number of the songs that the album includes
   */
  public getNumberOfSongs(): number {
    return this.songs.size;
  }

  /**
   * Adds a song to the album
   * @param newSong the song that will be included
   */
  public addSong(newSong: Song): void {
    this.songs.add(newSong);
  }

  /**
   * Removes a song of the album
   * @param songName the song that will be removed
   */
  public removeSong(songName: string): void {
    [...this].forEach((song) => {
      if (song.getName() === songName) {
        this.songs.delete(song)
      }
    });
  }

  /**
   * Returns the information of the album as a string
   */
   public asString(): string {
    let genresString = '';
    this.genres.forEach(genre => {
      genresString += `${genre.getName()} `;
    });

    let songsString = '';
    [...this].forEach(song => {
      songsString += `${song.getName()}, `;
    });

    let formatedAlbum = `${this.name} - Author: ${this.artist}, Year: ${this.year}, ` +
      `Songs: ${songsString}Genres: ${genresString}`;
    return formatedAlbum;
  }

  /**
   * Returns true if a song with the given name is in the album
   * @param songName name of the song to search in the album
   */
  public isSong(songName: string): boolean {
    let inAlbum = false;
    [...this].forEach(song => {
      if (song.getName() === songName) {
        inAlbum = true;
      }
    });
    return inAlbum;
  }
}