import {Album, AlbumInterface} from '../models/album'
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
      this.exportData(albums);
    }
  }

  public exportData(albumData: Album[]): void {
    let dbData: AlbumSchemaInterface = {albums: []};
    // Se escriben los álbumes
    albumData.forEach((album) => {
      let name = album.getName();
      let artist = album.getArtist();
      let year = album.getYear();
      let genresNames: string[] = [];
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

  getAlbumsNames(): string[] {
    const names: string[] = [];
    this.albums.forEach(album => {
      names.push(album.getName());
    });
    return names;
  }
}