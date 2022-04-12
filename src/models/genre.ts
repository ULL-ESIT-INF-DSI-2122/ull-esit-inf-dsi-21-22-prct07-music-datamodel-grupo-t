import {Album} from './album';
import {Artist} from './artist';
import {Group} from './group';
import {Song} from './song';

/**
 * All the posibles genres that the class Genre can represent
 */
export type GenreName = 
  "Rap" | "Pop" | "Trap" | "Rock" | "Electro" | "Classic" | "Country" |
  "Heavy" | "Jazz" | "Salsa" | "Flamenco" | "Folk" | "Country" | "Blues" |
  "Reggaeton" | "Punk" | "Reggae" | "Soul" | "Gospel" | "Popular" | "Disco" | "Hip Hop"

/**
 * An interface that defines a set of simple attributes for a Genre
 */
export interface GenreInterface {
  name: GenreName;
  artists: string[];
  albums: string[];
  songs: string[];
}

  /**
 * Genre class. Represent one of the genres that are stored in GenreName.
 */
export class Genre {
  /**
   * Constructor
   * @param name of the genre 
   * @param artists that belong to the genre
   * @param albums that belong to the genre
   * @param songs that belong to the genre 
   */
    constructor(private name: GenreName, private artists: (Artist | Group)[] = [], 
        private albums: Album[] = [], private songs: Song[] = []) {}

    /**
     * @returns the name of the genre
     */
    public getName() {
        return this.name;
    }

    /**
     * @returns the artists that belong to the genre
     */
    public getArtistCollection() {
        return this.artists;
    }

    /**
     * @returns the albumns that belong to the genre
     */
    public getAlbumCollection() {
        return this.albums;
    }

    /**
     * @returns the songs that belong to the genre
     */
    public getSongCollection() {
        return this.songs;
    }

    /**
     * Searches an artist by it's name and returns it
     * @param artist that will be returned
     * @returns the artist
     */
    public getArtist(artist: Artist | Group) {
        const index: number = this.artists.indexOf(artist);
        return this.artists[index];
    }

    /**
     * Searches an album by it's name and returns it
     * @param album that will be returned
     * @returns the album
     */
    public getAlbum(album: Album) {
        const index: number = this.albums.indexOf(album);
        return this.albums[index];
    }

    /**
     * Searches an song by it's name and returns it
     * @param song that will be returned
     * @returns the song
     */
    public getSong(song: Song) {
        const index: number = this.songs.indexOf(song);
        return this.songs[index];
    }

    /**
     * Changes the name of the genre
     * @param name that will replace the previous name
     */
    public setName(name: GenreName) {
        this.name = name;
    }

    /**
     * Chages the artists that belong to the genre
     * @param artists artist or group of artist that will replace the previous 
     * set
     */
    public setArtists(artists: (Artist | Group)[]) {
        this.artists = artists;
    }

    /**
     * Chages the albumns that belong to the genre
     * @param albums artist or group of artist that will replace the previous 
     * set
     */
    public setAlbums(albums: Album[]) {
        this.albums = albums;
    }

    /**
     * Chages the songs that belong to the genre
     * @param songs artist or group of artist that will replace the previous 
     * set
     */
    public setSongs(songs: Song[]) {
        this.songs = songs;
    }

    /**
     * Adds an artist to the set of artists that belong to the genre
     * @param artist that will be added
     */
    public addArtists(artist: (Artist | Group)) {
        this.artists.push(artist);
    }

    /**
     * Adds an album to the set of albums that belong to the genre
     * @param album that will be added
     */
    public addAlbum(album: Album) {
        this.albums.push(album);
    }

    /**
     * Adds an song to the set of songs that belong to the genre
     * @param song that will be added
     */
    public addSong(song: Song) {
        this.songs.push(song);
    }

    /**
     * Removes an artist from the set of artists
     * @param artistName that will be removed
     */
    public deleteArtists(artistName: string): void {
      for (let i = 0; i < this.artists.length; i++) {
        if (this.artists[i].getName() === artistName) {
          this.artists.splice(i, 1);
        }
      }
    }

    /**
     * Removes an album from the set of albums
     * @param albumName that will be removed
     */
    public deleteAlbum(albumName: string): void {
      for (let i = 0; i < this.albums.length; i++) {
        if (this.albums[i].getName() === albumName) {
          this.albums.splice(i, 1);
        }
      }
    }

    /**
     * Removes a song from the set of songs
     * @param song name of teh song that will be removed
     */
    public deleteSong(songName: string): void {
      for (let i = 0; i < this.songs.length; i++) {
        if (this.songs[i].getName() === songName) {
          this.songs.splice(i, 1);
        }
      }
    }
}