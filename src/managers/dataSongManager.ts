import {Song, SongInterface} from '../models/song'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

interface SongSchemaInterface {
  songs: SongInterface[];
}

export class DataSongManager {
  private songs: Song[];
  private database: lowdb.LowdbSync<SongSchemaInterface> = lowdb(new FileSync("./src/data/SongCollection.json"));

  public constructor(songs: Song[] = []) {
    this.songs = songs;
    if (!this.database.has("songs").value()) {
      this.exportData(songs);
    }
  }

  public getSongs(): Song[] {
    return this.songs;
  }

  public getSongNames(): string[] {
    let songNames: string[] = [];
    this.songs.forEach((song) => {
      songNames.push(song.getName());
    });
    return songNames;
  }

  public exportData(songData: Song[]): void {
    let dbData: SongSchemaInterface = {songs: []};
    // Se escriben las canciones
    songData.forEach((song) => {
      let name = song.getName();
      let artist = song.getAuthor();
      let duration = song.getDuration();
      let single = song.getIsSingle();
      let genresNames: string[] = [];
      song.getGenres().forEach((genre) => {
        genresNames.push(genre.getName());
      });
      let views = song.getViews();

      dbData.songs.push({
        name: name,
        artist: artist,
        duration: duration,
        isSingle: single,
        genres: genresNames,
        listeners: views
      });
    });
    this.database.set("songs", dbData.songs).write();
  }
}