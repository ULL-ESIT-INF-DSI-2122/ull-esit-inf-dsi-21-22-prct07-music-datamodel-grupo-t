import {Genre, GenreInterface, GenreName} from '../models/genre'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {Song} from '../models/song';
import {Artist} from '../models/artist';
import {Album} from '../models/album';

/**
 * Interface that defines the schema for the Genre class in the database
 */
 export interface GenreSchemaInterface {
  genres: GenreInterface[];
}

/**
 * Class in charge of manage all the data of the genres in the database
 */
export class DataGenreManager {
  private genres: Genre[];
  private database: lowdb.LowdbSync<GenreSchemaInterface> = lowdb(new FileSync('./src/data/GenreCollection.json'));

  /**
   * Constructor that will store the values of the default genres if there is no data.
   * @param genres default data of the genres that will be stored in the file if no data is found.
   */
  public constructor(genres: Genre[] = []) {
    this.genres = genres;
    if (!this.database.has("genres").value()) {
      this.writeData(genres);
    } else {
      this.readData();
    }
  }

  /**
   * @returns all the genres stored
   */
  public getGenres(): Genre[] {
    return this.genres;
  }

  /**
   * Searches an genre by it's name
   * @param genreName name of the genre the method will search
   * @returns that specific genre
   */
  public getDefinedGenre(genreName: GenreName): Genre | undefined {
    for (let i = 0; i < this.genres.length; i++) {
      if (genreName === this.genres[i].getName()) {
        return this.genres[i];
      }
    }
    return undefined;
  }

  /**
   * @returns all genre names in form of array
   */
  public getGenreNames(): GenreName[] {
    let genreNames: GenreName[] = [];
    this.genres.forEach((genre) => {
      genreNames.push(genre.getName());
    });
    return genreNames;
  }

  /**
   * This method updates the information stored in the database.
   * @param genresData data from the genre that will be writen
   */
  public writeData(genresData: Genre[] = []) {
    let dbData: GenreSchemaInterface = {genres: []};

    genresData.forEach((genre) => {
      let name = genre.getName();
      let artistsNames: string[] = [];
      genre.getArtistCollection().forEach((artist) => {
        artistsNames.push(artist.getName());
      });
      let albumsNames: string[] = [];
      genre.getAlbumCollection().forEach((album) => {
        albumsNames.push(album.getName());
      });
      let songsNames: string[] = [];
      genre.getSongCollection().forEach((song) => {
        songsNames.push(song.getName());
      });

      dbData.genres.push({
        name: name,
        artists: artistsNames,
        albums: albumsNames,
        songs: songsNames
      });
    });
    this.database.set("genres", dbData.genres).write();
  }

  /**
   * Reads all the information available in the database and stores it. This is 
   * crucial in order to operate with any type of data
   */
  public readData(): void {
    this.genres = [];
    let dbGenres = this.database.get("genres").value();
    dbGenres.forEach((genre) => {

      let artists: Artist[] = [];
      genre.artists.forEach((artist) => {
        artists.push(new Artist(artist));
      });

      let albums: Album[] = [];
      genre.albums.forEach((album) => {
        albums.push(new Album(album));
      });

      let songs: Song[] = [];
      genre.songs.forEach((song) => {
        songs.push(new Song(song));
      });
      let myGenre = new Genre(genre.name, artists, albums, songs);
      this.genres.push(myGenre);
    });
  }

  /**
   * Add's a new genre to the database. Calls the write() method in order to update
   * the database
   * @param newGenre genre that will be added
   * @returns 0 or -1 depending of the succes of the operation
   */
  public addNewGenre(newGenre: Genre): number {
    let alreadyInGenres = false;
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].getName() === newGenre.getName()) {
        alreadyInGenres = true;
        break;
      }
    }
    if (alreadyInGenres) {
      return -1;
    } else {
      this.genres.push(newGenre);
      this.writeData(this.genres);
      return 0;
    }
  }

  /**
   * Deletes a genre, searching it by it's name
   * @param genreName name of the genre that will be deleted
   */
  public deleteGenre(genreName: string): void {
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].getName() === genreName) {
        this.genres.splice(i, 1);
        break;
      }
    }
    this.writeData(this.genres);
  }
}