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

  public showPlaylists():string {
    let cad: string = '';
    this.playlists.forEach((playlist) => {
      cad = `Name: ${playlist.getName()}`;
      playlist.getSongs().forEach((song,index) => {        cad = cad + `Song ${index+1}: ${song.getName()}`;
      });
      
      playlist.getGenres().forEach((genre,index) => {
        cad = cad + `Genre ${index+1}: ${genre.getName()}`;
      });
      cad = cad + `Duration--> Minutes: ${playlist.getDuration().minutes} Seconds: ${playlist.getDuration().seconds}`;
      console.log(cad);
    });
    return cad;
  }
}