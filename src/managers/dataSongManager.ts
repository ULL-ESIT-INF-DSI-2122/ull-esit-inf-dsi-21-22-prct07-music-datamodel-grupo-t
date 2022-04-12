import {Song, SongInterface} from '../models/song'
import {Genre, GenreName} from '../models/genre'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {DataGenreManager} from './dataGenreManager'; 

/**
 * Interface that defines the schema for the Song class in the database
 */
export interface SongSchemaInterface {
  songs: SongInterface[];
}

/**
 * Class in charge of manage all the data of the songs in the database
 */
export class DataSongManager {
  private songs: Song[];
  private database: lowdb.LowdbSync<SongSchemaInterface> = lowdb(new FileSync("./src/data/SongCollection.json"));

  /**
   * Constructor
   * @param songs the class will storage in order to operate with them. 
   */
  public constructor(songs: Song[] = []) {
    this.songs = songs;
    if (!this.database.has("songs").value()) {
      this.writeData(songs);
    } else {
      this.readData();
    }
  }

  /** 
   * @returns all the songs stored
   */
  public getSongs(): Song[] {
    return this.songs;
  }

  /**
   * Searches an song by it's name
   * @param songName name of the song the method will search
   * @returns that specific song
   */
  public getDefinedSong(songName: string): Song | undefined{
    for (let i = 0; i < this.songs.length; i++) {
      if (songName === this.songs[i].getName()) {
        return this.songs[i];
      }
    }
    return undefined;
  }

  /**
   * @returns all song names in form of array
   */
  public getSongNames(): string[] {
    let songNames: string[] = [];
    this.songs.forEach((song) => {
      songNames.push(song.getName());
    });
    return songNames;
  }

  /**
   * This method updates the information stored in the database.
   * @param songData data from the songs that will be writen
   */
  public writeData(songData: Song[]): void {
    let dbData: SongSchemaInterface = {songs: []};

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

  /**
   * Reads all the information available in the database and stores it. This is 
   * crucial in order to operate with any type of data
   */
  public readData(): void {
    const dataGenres = new DataGenreManager();
    this.songs = [];
    let dbSongs = this.database.get("songs").value();
    dbSongs.forEach((song) => {
      // Leemos los géneros de la canción
      let genres: Genre[] = [];
      song.genres.forEach((genre) => {
        genres.push(dataGenres.getDefinedGenre(genre) as Genre);
      });
      let mySong = 
        new Song(song.name, song.artist, song.duration, 
          genres, song.isSingle, song.listeners);
      this.songs.push(mySong);
    });
  }

  /**
   * Add's a new song to the database. Calls the write() method in order to update
   * the database
   * @param newSong song that will be added
   * @returns 0 or -1 depending of the succes of the operation
   */
  public addNewSong(newSong: Song): number {
    let alreadyInSongs = false;
    for (let i = 0; i < this.songs.length; i++) {
      if ((this.songs[i].getName() === newSong.getName()) &&
        (this.songs[i].getAuthor() === newSong.getAuthor())) {
        alreadyInSongs = true;
        break;
      }
    }
    if (alreadyInSongs) {
      return -1;
    } else {
      this.songs.push(newSong);
      this.writeData(this.songs);
      return 0;
    }
  }

  /**
   * Deletes a song, searching it by it's name
   * @param songName name of the song that will be deleted
   */
  public deleteSong(songName: string): void {
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i].getName() === songName) {
        this.songs.splice(i, 1);
      }
    }
    this.writeData(this.songs);
  }


  /**
   * Returns an array of ordered Songs given the mode to be sorted
   * and an optional artist whose songs want to be searched
   * @param mode mode to sort the array of songs
   * @param author author whose songs want to be sorted
   * @returns the array sorted
   */
  public getSongsInOrder(mode: string, author = ''): Song[] {
    let songsToOrder: Song[] = [];
    if (author === '') {
      songsToOrder = this.songs;
    } else {
      this.songs.forEach(song => {
        if (song.getAuthor() === author) {
          songsToOrder.push(song);
        }
      });
    }
    switch(mode) {
      case 'UpAlphabet':
        songsToOrder.sort(function(a, b) {
          let songNameA = a.getName().toLowerCase(), songNameB = b.getName().toLowerCase();
          if (songNameA < songNameB) { return -1; }
          if (songNameA > songNameB) { return 1; }
          return 0;
        });
        break;
      case 'DownAlphabet':
        songsToOrder.sort(function(a, b) {
          let songNameA = a.getName().toLowerCase(), songNameB = b.getName().toLowerCase();
          if (songNameA > songNameB) { return -1; }
          if (songNameA < songNameB) { return 1; }
          return 0;
        });
        break;
      case 'UpViews':
        songsToOrder.sort(function(a, b) {
          let songViewsA = a.getViews(), songViewsB = b.getViews();
          if (songViewsA < songViewsB) { return -1; }
          if (songViewsA > songViewsB) { return 1; }
          return 0;
        });
        break;
      case 'DownViews':
        songsToOrder.sort(function(a, b) {
          let songViewsA = a.getViews(), songViewsB = b.getViews();
          if (songViewsA > songViewsB) { return -1; }
          if (songViewsA < songViewsB) { return 1; }
          return 0;
        });
        break;
      case 'Singles':
        this.songs.forEach((song, index) => {
          if (!song.getIsSingle()) {
            songsToOrder.splice(index, 1);
          }
        });
        break;
    }
    return songsToOrder;
  }
}