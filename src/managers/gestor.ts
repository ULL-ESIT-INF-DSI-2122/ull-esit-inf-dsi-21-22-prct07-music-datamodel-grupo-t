import {PlayList, PlaylistInterface} from '../models/playlist'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

interface PlaylistSchemaInterface {
  playlists: PlaylistInterface[];
}

export class Gestor {
  private playlists: PlayList[];
  private database: lowdb.LowdbSync<PlaylistSchemaInterface> = lowdb(new FileSync("./src/data/PlaylistCollection.json"));

  public constructor(playlists: PlayList[] = []) {
    this.playlists = playlists;
    if (!this.database.has("playlists").value()) {
      this.exportData(playlists);
    }
  }

  public exportData(playlists: PlayList[]): void {
    let dbData: PlaylistSchemaInterface = {playlists: []};
   // Se escriben las playlists
   playlists.forEach((playlist) => {
    let name = playlist.getName();
    let songsNames: string[] = [];
    playlist.getSongs().forEach((song) => {
      songsNames.push(song.getName());
    });
    let duration = playlist.getDuration();
    let genresNames: string[] = [];
    playlist.getGenres().forEach((genre) => {
      genresNames.push(genre.getName());
    });

    dbData.playlists.push({
      name: name,
      songs: songsNames,
      duration: duration,
      genres: genresNames
    });
  });
    this.database.set("playlists", dbData.playlists).write();
  }
}