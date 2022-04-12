import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {PlayList, PlaylistInterface} from '../models/playlist'
import {Genre, GenreName} from '../models/genre'
import {Group} from '../models/group'
import {Artist} from '../models/artist'
import {DataArtistManager} from './dataArtistManager'
import {DataGroupManager} from './dataGroupManager'
import {Song} from "../models/song";

/**
 * Interface that defines the schema for the Gestor class in the database
 */
interface PlaylistSchemaInterface {
  playlists: PlaylistInterface[];
}

/**
 * Class in charge of manage all the data of the playlist in the database
 */
export class Gestor {
  private playlists: PlayList[];
  private database: lowdb.LowdbSync<PlaylistSchemaInterface> = lowdb(new FileSync("./src/data/PlaylistCollection.json"));

  /**
   * Constructor
   * @param playlists the class will storage in order to operate with them. 
   */
  public constructor(playlists: PlayList[] = []) {
    this.playlists = playlists;
    if (!this.database.has("playlists").value()) {
      this.writeData(playlists);
    }
  }

  /**
   * This method updates the information stored in the database.
   * @param playlists data from the songs that will be writen
   */
  public writeData(playlists: PlayList[]): void {
    const dbData: PlaylistSchemaInterface = {playlists: []};

    playlists.forEach((playlist) => {
    const name = playlist.getName();
    const songsNames: string[] = [];
    playlist.getSongs().forEach((song) => {
      songsNames.push(song.getName());
    });
    const duration = playlist.getDuration();
    const genresNames: GenreName[] = [];
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

  /**
   * @returns all stored playlists
   */
  getPlaylists() {
    return this.playlists;
  }

  /**
   * Reads all the information available in the database and stores it. This is 
   * crucial in order to operate with any type of data
   */
  public readData(): void {
    this.playlists = [];
    const dbPlaylist = this.database.get("playlists").value();

    dbPlaylist.forEach(playlist => {
      const totalTime: {minutes: number, seconds: number} = {minutes: 0, seconds: 0};
      
      const songs: Song[] = [];
      playlist.songs.forEach(song => {
        songs.push(new Song(song));
      });

      songs.forEach(song => {
        totalTime.minutes += song.getDuration().minutes;
        totalTime.seconds += song.getDuration().seconds;
        if (totalTime.seconds > 59) {
          totalTime.minutes++;
          totalTime.seconds = totalTime.seconds % 60;
        }
      });

      const genres: Genre[] = [];
      playlist.genres.forEach(genre => {
        genres.push(new Genre(genre));
      });      
      
      const myPlaylist = new PlayList(playlist.name, songs, 
        totalTime, genres);

      this.playlists.push(myPlaylist);
    });
  }

  /**   
   * Add's a new playlist to the database. Calls the write() method in order to update
   * the database
   * @param newPlaylist playlist that will be added
   * @returns 0 or -1 depending of the succes of the operation
   */  
  public addNewPlaylist(newPlaylist: PlayList): number {
    let alreadyInPlaylist = false;
    for (let i = 0; i < this.playlists.length; i++) {
      console.log(this.playlists[i].getName())
      console.log(newPlaylist.getName())
      if ((this.playlists[i].getName() === newPlaylist.getName())) {
          alreadyInPlaylist = true;
        break;
      }
    }    if (alreadyInPlaylist) {
      return -1;
    } else {
      this.playlists.push(newPlaylist);
      this.writeData(this.playlists);
      return 0;
    }
  }

  /**
   * Show's the stored playlist and it's information
   * @returns the information in string format
   */
  public showPlaylists(): string {
    let cad = '';
    this.playlists.forEach((playlist) => {
      cad = `Name: ${playlist.getName()} | `;
      playlist.getSongs().forEach((song,index) => {        
        cad = cad + `Song ${index+1}: ${song.getName()} | `;
      });
      
      playlist.getGenres().forEach((genre,index) => {
        cad = cad + `Genre ${index+1}: ${genre.getName()} | `;
      });
      cad = cad + `Duration--> Minutes: ${playlist.getDuration().minutes} Seconds: ${playlist.getDuration().seconds}`;
      console.log(cad);
    });
    return cad;
  }


  /**
   * Returns an array of PlayLists that are related to a group or artist given.
   * @param artist whose related playlist are searched
   * @returns the array of related playlists of the group or artist
   */
  public getPlayListOfArtist(artist: string): PlayList[] | undefined {
    let playlistOfArtist: PlayList[] = [];
    let relatedArtist: (Group | Artist | undefined);
    let dataArtistManager = new DataArtistManager();
    let dataGroupManager = new DataGroupManager();
    relatedArtist = dataArtistManager.getDefinedArtist(artist);
    if (relatedArtist === undefined) {
      relatedArtist = dataGroupManager.getDefinedGroup(artist);
    }
    if (relatedArtist === undefined) {
      return undefined;
    } else {
      this.playlists.forEach(playlist => {
        let songsOfPlaylist = playlist.getSongs();
        for (let i = 0; i < songsOfPlaylist.length; i++) {
          if (songsOfPlaylist[i].getAuthor() === relatedArtist?.getName()) {
            playlistOfArtist.push(playlist);
            break;
          }
        }
      });
      return playlistOfArtist;
    }
  }


  /**
   * Returns an array of ordered Playlists given the mode to be sorted
   * and an optional artist or group whose related playlists want to be searched
   * @param mode mode to sort the array of playlists
   * @returns the array sorted
   */
   public getPlaylistInOrder(mode: string, artist = ''): PlayList[] {
    let playlistsToOrder: PlayList[] = [];
    if (artist === '') {
      playlistsToOrder = this.playlists;
    } else {
      let playlistArtist = this.getPlayListOfArtist(artist)
      if (playlistArtist === undefined) {
        return [];
      } else {
        playlistsToOrder = playlistArtist;
      }    
    }
    switch(mode) {
      case 'UpAlphabet':
        playlistsToOrder.sort(function(a, b) {
          let albumNameA = a.getName().toLowerCase(), albumNameB = b.getName().toLowerCase();
          if (albumNameA < albumNameB) { return -1; }
          if (albumNameA > albumNameB) { return 1; }
          return 0;
        });
        break;
      case 'DownAlphabet':
        playlistsToOrder.sort(function(a, b) {
          let albumNameA = a.getName().toLowerCase(), albumNameB = b.getName().toLowerCase();
          if (albumNameA > albumNameB) { return -1; }
          if (albumNameA < albumNameB) { return 1; }
          return 0;
        });
        break;
    }
    return playlistsToOrder;
  }

  /**
   * Returns ordered songs from a specific playlist in diferent modes
   * @param playlist in which the songs belong
   * @param mode dictates how it will be sorted
   * @returns sorted songs
   */
  public orderedSongsFromPlaylist(playlist: PlayList, mode: string): Song[] {
    let songs = playlist.getSongs();
    switch(mode) {
      case 'UpAlphabet':
        songs.sort(function(a, b) {
          let songNameA = a.getName().toLowerCase(), songNameB = b.getName().toLowerCase();
          if (songNameA < songNameB) { return -1; }
          if (songNameA > songNameB) { return 1; }
          return 0;
        });
        break;
      case 'DownAlphabet':
        songs.sort(function(a, b) {
          let songNameA = a.getName().toLowerCase(), songNameB = b.getName().toLowerCase();
          if (songNameA > songNameB) { return -1; }
          if (songNameA < songNameB) { return 1; }
          return 0;
        });
        break;
    }
    return songs;
  }
}

