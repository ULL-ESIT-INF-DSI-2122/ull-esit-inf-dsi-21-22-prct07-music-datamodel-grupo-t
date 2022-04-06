import {Genre, GenreName} from './models/genre';
import {Album} from './models/album';
import {Artist} from './models/artist';
import {Group} from './models/group';
import {Song} from './models/song';
import {PlayList} from './models/playlist';
import {DataMusicCollection} from './dataMusicCollection';
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

type schemaType = {
  genres: {
    name: GenreName;
    artists: (Group | Artist)[];
    albums: Album[];
    songs: Song[];
  }[];

  artists: {
    name: string;
    groups: Group[];
    genres: Genre[];
    albums: Album[];
    songs: Song[];
    monthlyListeners: number;
  }[];

  albums: {
    name: string;
    artists: string[];
    year: number;
    genres: Genre[];
    songs: Song[];
  }[];

  groups: {
    name: string;
    artists: Artist[];
    year: number;
    genres: Genre[];
    albums: Album[];
    monthlyListeners: number;
  }[];

  songs: {
    name: string;
    artist: string;
    duration: {minutes: number, seconds: number};
    genres: Genre[];
    isSingle: boolean;
    views: number;
  }[];

  playlists: {
    name: string;
    songs: Song[];
    duration: {minutes: number, seconds: number};
    genres: Genre[];
  }[];
};

export class JsonDataMusicCollection extends DataMusicCollection {
  private database: lowdb.LowdbSync<schemaType>;

  public constructor(genres: Genre[] = [], artists: Artist[] = [], albums: Album[] = [],
      groups: Group[] = [], songs: Song[] = [], playlists: PlayList[] = []) {
    super(genres, artists, albums, groups, songs, playlists);
  
    this.database = lowdb(new FileSync("MusicCollection.json"));
    if (this.database.has("genres").value()) {
      let dbGenres = this.database.get("genres").value();
      dbGenres.forEach((genre) => {
        this.genres.push(
          new Genre(genre.name, genre.artists, genre.albums, genre.songs)
        );
      });
    }

    if (this.database.has("songs").value()) {
      let dbSongs = this.database.get("songs").value();
      dbSongs.forEach((song) => {
        this.songs.push(
          new Song(song.name, song.artist, song.duration, song.genres, song.isSingle, song.views)
        );
      });
    }

    if (this.database.has("albums").value()) {
      let dbAlbums = this.database.get("albums").value();
      dbAlbums.forEach((album) => {
        this.albums.push(
          new Album(album.name, album.artists, album.year, album.genres, album.songs)
        );
      });
    }
    let nameGenres: string[] = [];
    genres.forEach((genre) => {
      nameGenres.push(genre.getName());
    });
    this.database.set("genres", nameGenres).write();

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