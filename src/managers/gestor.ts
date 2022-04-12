import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {PlayList, PlaylistInterface} from '../models/playlist'
import {Genre, GenreInterface} from '../models/genre'
import {Group} from '../models/group'
import {Artist} from '../models/artist'
import {Song, SongInterface} from '../models/song'
import {DataArtistManager} from './dataArtistManager'
import {DataGroupManager} from './dataGroupManager'


interface PlaylistSchemaInterface {
  playlists: PlaylistInterface[];
}

export class Gestor {
  private playlists: PlayList[];
  private database: lowdb.LowdbSync<PlaylistSchemaInterface> = lowdb(new FileSync("./src/data/PlaylistCollection.json"));

  public constructor(playlists: PlayList[] = []) {
    this.playlists = playlists;
    if (!this.database.has("playlists").value()) {
      this.writeData(playlists);
    }
  }

  public writeData(playlists: PlayList[]): void {
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

  public showPlaylists():string {
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
   * @param artist author whose related playlists want to be sorted
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
}

