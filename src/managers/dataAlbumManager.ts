import {Album, AlbumInterface} from '../models/album';
import {Genre, GenreName} from '../models/genre';
import {Song} from '../models/song';
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

/**
 * Interface that defines the schema for the Album class in the database
 */
export interface AlbumSchemaInterface {
  albums: AlbumInterface[];
}

/**
 * Class in charge of manage all the data of the albumns in the database. 
 */
export class DataAlbumManager {
  private albums: Album[];
  private database: lowdb.LowdbSync<AlbumSchemaInterface> = lowdb(new FileSync("./src/data/AlbumCollection.json"));

  /**
   * Constructor
   * @param albums the class will storage in order to operate with them. 
   */
  public constructor(albums: Album[] = []) {
    this.albums = albums;
    if (!this.database.has("albums").value()) {
      this.writeData(albums);
    } else {
      this.readData();
    }
  }

  /**
   * This method updates the information stored in the database.
   * @param albumData data from the albumns that will be writen
   */
  public writeData(albumData: Album[]): void {
    let dbData: AlbumSchemaInterface = {albums: []};
  
    albumData.forEach((album) => {
      let name = album.getName();
      let artist = album.getArtist();
      let year = album.getYear();
      let genresNames: GenreName[] = [];
      album.getGenres().forEach((genre) => {
        genresNames.push(genre.getName());
      });
      let songsNames: string[] = [];
      [...album].forEach((song) => {
        songsNames.push(song.getName());
      });

      dbData.albums.push({
        name: name,
        artists: artist,
        year: year,
        genres: genresNames,
        songs: songsNames
      });
    });
    this.database.set("albums", dbData.albums).write();
  }

  /**
   * Reads all the information available in the database and stores it. This is 
   * crucial in order to operate with any type of data
   */
  public readData() {
    this.albums = [];
    let dbAlbums = this.database.get("albums").value();
    dbAlbums.forEach((album) => {

      let genres: Genre[] = [];
      album.genres.forEach((genre) => {
        genres.push(new Genre(genre));
      });

      let songs: Song[] = [];
      album.songs.forEach((song) => {
        songs.push(new Song(song));
      });
      let myAlbum = 
        new Album(album.name, album.artists, album.year, genres, songs);
      this.albums.push(myAlbum);
    });
  }

  /**
   * @returns albumns stored
   */
  public getAlbums(): Album[] {
    return this.albums;
  }

  /**
   * Searches an album by it's name
   * @param albumName name of the album the method will search
   * @returns that specific album
   */
  public getDefinedAlbum(albumName: string): Album | undefined {
    for (let i = 0; i < this.albums.length; i++) {
      if (albumName === this.albums[i].getName()) {
        return this.albums[i];
      }
    }
    return undefined;
  }
  
  /**
   * @returns all albumn names in form of array
   */
  public getAlbumsNames(): string[] {
    const names: string[] = [];
    this.albums.forEach(album => {
      names.push(album.getName());
    });
    return names;
  }

  /**
   * Add's a new album to the database. Calls the write() method in order to update
   * the database
   * @param newAlbum album that will be added
   * @returns 0 or -1 depending of the succes of the operation
   */
  public addNewAlbum(newAlbum: Album): number {
    let alreadyInAlbums = false;
    for (let i = 0; i < this.albums.length; i++) {
      if ((this.albums[i].getName() === newAlbum.getName()) &&
        (this.albums[i].getArtist() === newAlbum.getArtist())) {
        alreadyInAlbums = true;
        break;
      }
    }
    if (alreadyInAlbums) {
      return -1;
    } else {
      this.albums.push(newAlbum);
      this.writeData(this.albums);
      return 0;
    }
  }

  /**
   * Deletes an album, searching it by it's name
   * @param albumName name of the album that will be deleted
   */
  public deleteAlbum(albumName: string): void {
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i].getName() === albumName) {
        this.albums.splice(i, 1);
      }
    }
    this.writeData(this.albums);
  }

   /**
   * Returns an array of ordered Albums given the mode to be sorted
   * and an optional artist whose albums want to be searched
   * @param mode mode to sort the array of albums
   * @param author author whose albums want to be sorted
   * @returns the array sorted
   */
    public getAlbumsInOrder(mode: string, author = ''): Album[] {
      let albumsToOrder: Album[] = [];
      if (author === '') {
        albumsToOrder = this.albums;
      } else {
        this.albums.forEach(album => {
          if (album.getArtist() === author) {
            albumsToOrder.push(album);
          }
        });
      }
      switch(mode) {
        case 'UpAlphabet':
          albumsToOrder.sort(function(a, b) {
            let albumNameA = a.getName().toLowerCase(), albumNameB = b.getName().toLowerCase();
            if (albumNameA < albumNameB) { return -1; }
            if (albumNameA > albumNameB) { return 1; }
            return 0;
          });
          break;
        case 'DownAlphabet':
          albumsToOrder.sort(function(a, b) {
            let albumNameA = a.getName().toLowerCase(), albumNameB = b.getName().toLowerCase();
            if (albumNameA > albumNameB) { return -1; }
            if (albumNameA < albumNameB) { return 1; }
            return 0;
          });
          break;
        case 'YearOfRelease':
          albumsToOrder.sort(function(a, b) {
            let albumYearA = a.getYear(), albumYearB = b.getYear();
            if (albumYearA > albumYearB) { return -1; }
            if (albumYearA < albumYearB) { return 1; }
            return 0;
          });
          break;
      }
      return albumsToOrder;
    }
}

