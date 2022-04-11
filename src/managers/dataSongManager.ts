import {Song, SongInterface} from '../models/song'
import {Genre, GenreName} from '../models/genre'
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
      this.writeData(songs);
    } else {
      this.readData();
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


  public writeData(songData: Song[]): void {
    let dbData: SongSchemaInterface = {songs: []};
    // Se escriben las canciones
    songData.forEach((song) => {
      let name = song.getName();
      let artist = song.getAuthor();
      let duration = song.getDuration();
      let single = song.getIsSingle();
      let genresNames: GenreName[] = [];
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


  public readData(): void {
    this.songs = [];
    let dbGenres = this.database.get("songs").value();
    dbGenres.forEach((song) => {
      // Leemos los géneros de la canción
      let genres: Genre[] = [];
      song.genres.forEach((genre) => {
        genres.push(new Genre(genre));
      });
      let mySong = 
        new Song(song.name, song.artist, song.duration, 
          genres, song.isSingle, song.listeners);
      this.songs.push(mySong);
    });
  }


  public addSong(newSong: Song): void {
    let alreadyInSongs = false;
    for (let i = 0; i < this.songs.length; i++) {
      if ((this.songs[i].getName() === newSong.getName()) &&
        (this.songs[i].getAuthor() === newSong.getAuthor())) {
        alreadyInSongs = true;
        break;
      }
    }
    if (alreadyInSongs) {
      console.log('Error, ya existe una canción con ese nombre y artista.');
    } else {
      this.songs.push(newSong);
      this.writeData(this.songs);
    }
  }


  public deleteSong(songName: string): void {
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i].getName() === songName) {
        this.songs.splice(i, 1);
      }
    }
    this.writeData(this.songs);
  }
}