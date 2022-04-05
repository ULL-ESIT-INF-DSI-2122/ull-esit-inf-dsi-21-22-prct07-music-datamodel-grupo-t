import {Genre} from './models/genre';
import {Album} from './models/album';
import {Artist} from './models/artist';
import {Group} from './models/group';
import {Song} from './models/song';
import {PlayList} from './models/playlist';
import {DataMusicCollection} from './dataMusicCollection';
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  genres: Genre[];
  artists: Artist[];
  albums: Album[];
  groups: Group[];
  songs: Song[];
  playlists: PlayList[];
}

export class JsonDataMusicCollection extends DataMusicCollection {
  private database: lowdb.LowdbSync<schemaType>;

  public constructor(genres: Genre[] = [], artists: Artist[] = [], albums: Album[] = [],
      groups: Group[] = [], songs: Song[] = [], playlists: PlayList[] = []) {
    super(genres, artists, albums, groups, songs, playlists);
  
    this.database = lowdb(new FileSync("MusicCollection.json"));
    this.database.set("genres", genres).write();
    this.database.set("artists", artists).write();
    this.database.set("albums", albums).write();
    this.database.set("groups", groups).write();
    this.database.set("songs", songs).write();
    this.database.set("playlists", playlists).write();  
  }

  public addNewGenre(newGenre: Genre): void {
    super.addNewGenre(newGenre);
    this.database.set("genres", this.genres).write();
  }

  public deleteGenre(genreName: string): void {
    super.deleteGenre(genreName);
    this.database.set("genres", this.genres).write();
  }

  public addNewArtist(newArtist: Artist): void {
    super.addNewArtist(newArtist);
    this.database.set("artists", this.artists).write();
  }

  public deleteArtist(artistName: string): void {
    super.deleteArtist(artistName);
    this.database.set("artists", this.artists).write();
  }

  public addNewAlbum(newAlbum: Album): void {
    super.addNewAlbum(newAlbum);
    this.database.set("albums", this.albums).write();
  }

  public deleteAlbum(albumName: string): void {
    super.deleteAlbum(albumName);
    this.database.set("albums", this.albums).write();
  }

  public addNewGroup(newGroup: Group): void {
    super.addNewGroup(newGroup);
    this.database.set("groups", this.groups).write();
  }

  public deleteGroup(groupName: string): void {
    super.deleteGroup(groupName);
    this.database.set("groups", this.groups).write();
  }

  public addNewSong(newSong: Song): void {
    super.addNewSong(newSong);
    this.database.set("songs", this.songs).write();
  }

  public deleteSong(songName: string): void {
    super.deleteSong(songName);
    this.database.set("songs", this.songs).write();
  }

  public addNewPlayList(newPlayList: PlayList): void {
    super.addNewPlayList(newPlayList);
    this.database.set("playlists", this.playlists).write();
  }

  public deletePlayList(playlistName: string): void {
    super.deletePlayList(playlistName);
    this.database.set("playlists", this.playlists).write();
  }
}