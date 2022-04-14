import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {PlayList, PlaylistInterface} from '../models/playlist';
import {Genre, GenreName} from '../models/genre';
import {Group} from '../models/group';
import {Artist} from '../models/artist';
import {Song} from "../models/song";
import {DataArtistManager} from './dataArtistManager';
import {DataGroupManager} from './dataGroupManager';
import {DataSongManager} from '../managers/dataSongManager';
import {DataAlbumManager} from "./dataAlbumManager";


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
  public getPlaylists(): PlayList[] {
    return this.playlists;
  }

  /**
  * @returns all stored playlists's names
  */
  public getPlaylistNames(): string[] {
    let playlistNames: string[] = [];
    this.playlists.forEach(playlist => {
      playlistNames.push(playlist.getName());
    });
    return playlistNames;
  }

  /**
   * Returns an specific playlist, searched by it's name
   * @param name of the playlist
   * @returns the playlist
   */
  public getSpecificPlaylist(name: string): PlayList {
    this.readData();
    let result: PlayList = new PlayList('', [], {minutes: 0, seconds: 0}, []);
    for (let i = 0; i < this.playlists.length; i++) {
      if (name === this.playlists[i].getName()) {
        result = this.playlists[i];
      }
    }
    return result;
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
   * Returns the given playlists's information as a string.
   * If no array is given, returns the stored playlists in the database.
   * @returns the information in string format
   */
  public showPlaylists(playlist: PlayList[] = []): string {
    let cad = '';
    let playlistToReturn = playlist;
    if (playlist.length === 0) {
      playlistToReturn = this.playlists;
    }
    playlistToReturn.forEach((playlist) => {
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
    const songs: Song[] = [];
    const dataSongManager = new DataSongManager();

    playlist.getSongs().forEach(songPlayList => {
      let song = dataSongManager.getDefinedSong(songPlayList.getName()) as Song;
      songs.push(song);
    });
    
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
        case 'UpArtist':
          songs.sort(function(a, b) {
            let artistA = a.getAuthor().toLowerCase(), artistB = b.getAuthor().toLowerCase();
            if (artistA < artistB) { return -1; }
            if (artistA > artistB) { return 1; }
            return 0;
          });
          break;
        case 'DownArtist':
          songs.sort(function(a, b) {
            let artistA = a.getAuthor().toLowerCase(), artistB = b.getAuthor().toLowerCase();
            if (artistA > artistB) { return -1; }
            if (artistA < artistB) { return 1; }
            return 0;
          });
          break;
        case 'UpYear':
          songs.sort(function(a, b) {
            const dataAlbumManager = new DataAlbumManager();
            let yearA = 0, yearB = 0;
            dataAlbumManager.getAlbums().forEach(album => {
              if (album.isSong(a.getName())) {
                yearA = album.getYear();
              }
              if (album.isSong(b.getName())) {
                yearB = album.getYear();
              }
            });
            if (yearA < yearB) { return -1; }
            if (yearA > yearB) { return 1; }
            return 0;
          });
          break;
        case 'DownYear':
          songs.sort(function(a, b) {
            const dataAlbumManager = new DataAlbumManager();
            let yearA = 0, yearB = 0;
            dataAlbumManager.getAlbums().forEach(album => {
              if (album.isSong(a.getName())) {
                yearA = album.getYear();
              }
              if (album.isSong(b.getName())) {
                yearB = album.getYear();
              }
            });
            if (yearA > yearB) { return -1; }
            if (yearA < yearB) { return 1; }
            return 0;
          });
          break;
        case 'UpTime':
          songs.sort(function(a, b) {
            let timeA = a.getDuration().minutes, timeB = b.getDuration().minutes;
            // Si los minutos son iguales se medirán por los segundos
            if (timeA === timeB) timeA = a.getDuration().seconds, timeB = b.getDuration().seconds;
            if (timeA > timeB) { return -1; }
            if (timeA < timeB) { return 1; }
            return 0;
          });
          break;
        case 'DownTime':
          songs.sort(function(a, b) {
            let timeA = a.getDuration().minutes, timeB = b.getDuration().minutes;
            // Si los minutos son iguales se medirán por los segundos
            if (timeA === timeB) timeA = a.getDuration().seconds, timeB = b.getDuration().seconds;
            if (timeA < timeB) { return -1; }
            if (timeA > timeB) { return 1; }
            return 0;
          });
          break;
        case 'UpGenre':
          songs.sort(function(a, b) {
            let genreA = a.getGenres()[0].getName().toLowerCase(), genreB = b.getGenres()[0].getName().toLowerCase();
            if (genreA < genreB) { return -1; }
            if (genreA > genreB) { return 1; }
            return 0;
          });
          break;
        case 'DownGenre':
          songs.sort(function(a, b) {
            let genreA = a.getGenres()[0].getName().toLowerCase(), genreB = b.getGenres()[0].getName().toLowerCase();
            if (genreA > genreB) { return -1; }
            if (genreA < genreB) { return 1; }
            return 0;
          });
          break;
          case 'UpViews':
        songs.sort(function(a, b) {
          let viewsA = a.getViews(), viewsB = b.getViews();
          if (viewsA > viewsB) { return -1; }
          if (viewsA < viewsB) { return 1; }
          return 0;
        });
        break;
        case 'DownViews':
          songs.sort(function(a, b) {
            let viewsA = a.getViews(), viewsB = b.getViews();
            if (viewsA < viewsB) { return -1; }
            if (viewsA > viewsB) { return 1; }
            return 0;
          });
          break;
    }
    return songs;
  }
}

