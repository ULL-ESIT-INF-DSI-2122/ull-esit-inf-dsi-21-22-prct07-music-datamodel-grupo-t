import {Album, AlbumInterface} from '../models/album';
import {Genre, GenreName} from '../models/genre';
import {Song} from '../models/song';
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

interface AlbumSchemaInterface {
  albums: AlbumInterface[];
}

export class DataAlbumManager {
  private albums: Album[];
  private database: lowdb.LowdbSync<AlbumSchemaInterface> = lowdb(new FileSync("./src/data/AlbumCollection.json"));

  public constructor(albums: Album[] = []) {
    this.albums = albums;
    if (!this.database.has("albums").value()) {
      this.writeData(albums);
    } else {
      this.readData();
    }
  }

  public writeData(albumData: Album[]): void {
    let dbData: AlbumSchemaInterface = {albums: []};
    // Se escriben los álbumes
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

  public readData() {
    this.albums = [];
    let dbAlbums = this.database.get("albums").value();
    dbAlbums.forEach((album) => {
      // Leemos los géneros del álbum
      let genres: Genre[] = [];
      album.genres.forEach((genre) => {
        genres.push(new Genre(genre));
      });
      // Leemos las canciones del álbum
      let songs: Song[] = [];
      album.songs.forEach((song) => {
        songs.push(new Song(song));
      });
      let myAlbum = 
        new Album(album.name, album.artists, album.year, genres, songs);
      this.albums.push(myAlbum);
    });
  }

  public getAlbums(): Album[] {
    return this.albums;
  }

  public getDefinedAlbum(albumName: string): Album | undefined {
    for (let i = 0; i < this.albums.length; i++) {
      if (albumName === this.albums[i].getName()) {
        return this.albums[i];
      }
    }
    return undefined;
  }
  
  public getAlbumsNames(): string[] {
    const names: string[] = [];
    this.albums.forEach(album => {
      names.push(album.getName());
    });
    return names;
  }

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

  public deleteAlbum(albumName: string): void {
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i].getName() === albumName) {
        this.albums.splice(i, 1);
      }
    }
    this.writeData(this.albums);
  }
}