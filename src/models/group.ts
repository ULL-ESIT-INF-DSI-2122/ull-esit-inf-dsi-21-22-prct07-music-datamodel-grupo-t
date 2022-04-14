import {Album} from './album';
import {Artist} from './artist';
import {Genre, GenreName} from './genre';

/**
 * An interface that defines simple data for a group
 */
export interface GroupInterface {
  name: string;
  artists: string[];
  year: number;
  genres: GenreName[];
  albums: string[];
  monthlyListeners: number;
}

/**
 * Group class. Represents a group of artist's that owns songs and albums
 */
export class Group {
  /**
   * Constructor
   * @param name of the group
   * @param artists that are members of the group
   * @param yearOfCreation year where the group was found
   * @param relatedGenres genres that the group belongs with
   * @param albums that the group owns
   * @param monthlyListeners number of the listeners of each month
   */
  constructor(private name: string, private artists: Artist[] = [], private yearOfCreation: number = 0,
      private relatedGenres: Genre[] = [], private albums: Album[] = [], private monthlyListeners: number = 0) {
  }

  /**
   * @returns the name of the group
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns the set of artists of the group
   */
  public getArtists(): Artist[] {
    return this.artists;
  }

  /**
   * @returns the year of fundation of the group
   */
  public getYearOfCreation(): number {
    return this.yearOfCreation;
  }

  /**
   * @returns the set of genres of the group
   */
  public getRelatedGenres(): Genre[] {
    return this.relatedGenres;
  }

  /**
   * Removes an genre from the group
   */
  public removeGenre(genreName: string): void {
    this.relatedGenres.forEach((genre, i) => {
      if (genre.getName() === genreName) {
        this.relatedGenres.splice(i, 1);
      }
    });
  }

  /**
   * Removes an genre from the group
   */
   public removeArtist(artistName: string): void {
    this.artists.forEach((artist, i) => {
      if (artist.getName() === artistName) {
        this.artists.splice(i, 1);
      }
    });
  }

  /**
 * Removes a album of the album
 * @param albumName the album that will be removed
 */
  public removeAlbum(albumName: string): void {
    this.albums.forEach((album, i) => {
      if (album.getName() === albumName) {
        this.albums.splice(i, 1);
      }
    });
  }

  /**
   * @returns the set albums of the group
   */
  public getAlbums(): Album[] {
    return this.albums;
  }

  /**
   * @returns the monthly listeners of the group
   */
  public getMonthlyListeners(): number {
    return this.monthlyListeners;
  }

  /**
   * Adds an artist to the set of artists
   * @param artist that will be added
   */
  public addArtist(artist: Artist): void {
    this.artists.push(artist);
  }

  /**
   * Adds an artist to the set of artists
   * @param genre that will be added
   */
   public addGenre(genre: Genre): void {
    this.relatedGenres.push(genre);
  }
}