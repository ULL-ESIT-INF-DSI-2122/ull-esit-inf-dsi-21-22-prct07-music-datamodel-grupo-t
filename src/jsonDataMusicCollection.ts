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
    name: string;
    artists: string[];
    albums: string[];
    songs: string[];
  }[];

  artists: {
    name: string;
    groups: string[];
    genres: string[];
    albums: string[];
    songs: string[];
    monthlyListeners: number;
  }[];

  albums: {
    name: string;
    artists: string;
    year: number;
    genres: string[];
    songs: string[];
  }[];

  groups: {
    name: string;
    artists: string[];
    year: number;
    genres: string[];
    albums: string[];
    monthlyListeners: number;
  }[];

  songs: {
    name: string;
    artist: string;
    duration: {minutes: number, seconds: number};
    genres: string[];
    isSingle: boolean;
    listeners: number;
  }[];

  playlists: {
    name: string;
    songs: string[];
    duration: {minutes: number, seconds: number};
    genres: string[];
  }[];
};


export class JsonDataMusicCollection extends DataMusicCollection {
  private database: lowdb.LowdbSync<schemaType>;

  public constructor(genres: Genre[] = [], artists: Artist[] = [], albums: Album[] = [],
      groups: Group[] = [], songs: Song[] = [], playlists: PlayList[] = []) {
    super(genres, artists, albums, groups, songs, playlists);
    
    // Escribiendo los datos en el JSON
    this.database = lowdb(new FileSync("MusicCollection.json"));
    let dbCollection: schemaType = {genres: [], artists: [], albums: [], groups: [], songs: [], playlists: []};
    // Se escriben los géneros
    genres.forEach((genre) => {
      let name = genre.getName();
      let artistsNames: string[] = [];
      genre.getArtistCollection().forEach((artist) => {
        artistsNames.push(artist.getName());
      });
      let albumsNames: string[] = [];
      genre.getAlbumCollection().forEach((album) => {
        albumsNames.push(album.getName());
      });
      let songsNames: string[] = [];
      genre.getSongCollection().forEach((song) => {
        songsNames.push(song.getName());
      });

      dbCollection.genres.push({
        name: name,
        artists: artistsNames,
        albums: albumsNames,
        songs: songsNames
      });
    });
    // Se escriben los artistas
    artists.forEach((artist) => {
      let name = artist.getName();
      let groupsNames: string[] = [];
      artist.getGroups().forEach((group) => {
        groupsNames.push(group.getName());
      });
      let genresNames: string[] = [];
      artist.getGenres().forEach((genre) => {
        genresNames.push(genre.getName());
      });
      let albumsNames: string[] = [];
      artist.getAlbums().forEach((album) => {
        albumsNames.push(album.getName());
      });
      let songsNames: string[] = [];
      artist.getSongs().forEach((song) => {
        songsNames.push(song.getName());
      });
      let views = artist.getMonthlyListeners();

      dbCollection.artists.push({
        name: name,
        groups: groupsNames,
        genres: genresNames,
        albums: albumsNames,
        songs: songsNames,
        monthlyListeners: views
      });
    });
    // Se escriben los álbumes
    albums.forEach((album) => {
      let name = album.getName();
      let artist = album.getArtist();
      let year = album.getYear();
      let genresNames: string[] = [];
      album.getGenres().forEach((genre) => {
        genresNames.push(genre.getName());
      });
      let songsNames: string[] = [];
      [...album].forEach((song) => {
        songsNames.push(song.getName());
      });

      dbCollection.albums.push({
        name: name,
        artists: artist,
        year: year,
        genres: genresNames,
        songs: songsNames
      });
    });
    // Se escriben los grupos
    groups.forEach((group) => {
      let name = group.getName();
      let artistsName: string[] = [];
      group.getArtists().forEach((artist) => {
        artistsName.push(artist.getName());
      });
      let year = group.getYearOfCreation();
      let genresNames: string[] = [];
      group.getRelatedGenres().forEach((genre) => {
        genresNames.push(genre.getName());
      });
      let albumsNames: string[] = [];
      group.getAlbums().forEach((album) => {
        albumsNames.push(album.getName());
      });
      let views = group.getMonthlyListeners();

      dbCollection.groups.push({
        name: name,
        artists: artistsName,
        year: year,
        genres: genresNames,
        albums: albumsNames,
        monthlyListeners: views
      });
    });
    // Se escriben las canciones
    songs.forEach((song) => {
      let name = song.getName();
      let artist = song.getAuthor();
      let duration = song.getDuration();
      let single = song.getIsSingle();
      let genresNames: string[] = [];
      song.getGenres().forEach((genre) => {
        genresNames.push(genre.getName());
      });
      let views = song.getViews();

      dbCollection.songs.push({
        name: name,
        artist: artist,
        duration: duration,
        isSingle: single,
        genres: genresNames,
        listeners: views
      });
    });
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

      dbCollection.playlists.push({
        name: name,
        songs: songsNames,
        duration: duration,
        genres: genresNames
      });
    });
    //
    //if (this.database.has("genres").value()) {
    //  let dbGenres = this.database.get("genres").value();
    //  dbGenres.forEach((genre) => {
    //    if (!this.genres.includes(genre)) {
    //      this.genres.push(
    //        new Genre(genre.name, genre.artists, genre.albums, genre.songs)
    //      );
    //    }
    //  });
    //}
//
    //if (this.database.has("songs").value()) {
    //  let dbSongs = this.database.get("songs").value();
    //  dbSongs.forEach((song) => {
    //    if (!this.songs.includes(song)) {
    //      this.songs.push(
    //        new Song(song.name, song.artist, song.duration, song.genres, song.isSingle, song.views)
    //      );
    //    }
    //  });
    //}
//
    //if (this.database.has("albums").value()) {
    //  let dbAlbums = this.database.get("albums").value();
    //  dbAlbums.forEach((album) => {
    //    if (!this.albums.includes(album)) {
    //      this.albums.push(
    //        new Album(album.name, album.artists, album.year, album.genres, album.songs)
    //      );
    //    }
    //  });
    //}
//
    //if (this.database.has("artists").value()) {
    //  let dbArtists = this.database.get("artists").value();
    //  dbArtists.forEach((artist) => {
    //    this.artists.push(
    //      new Artist(artist.name, artist.groups, artist.genres, artist.albums, artist.songs)
    //    );
    //  });
    //}
//
    //if (this.database.has("groups").value()) {
    //  let dbGroups = this.database.get("groups").value();
    //  dbGroups.forEach((group) => {
    //    this.groups.push(
    //      new Group(group.name, group.artists, group.year, group.genres, group.albums, group.monthlyListeners)
    //    );
    //  });
    //}


    this.database.set("genres", dbCollection.genres).write();
    this.database.set("artists", dbCollection.artists).write();
    this.database.set("albums", dbCollection.albums).write();
    this.database.set("groups", dbCollection.groups).write();
    this.database.set("songs", dbCollection.songs).write();
    this.database.set("playlists", dbCollection.playlists).write();  
  }

//   public addNewGenre(newGenre: Genre): void {
//     super.addNewGenre(newGenre);
//     this.database.set("genres", this.genres).write();
//   }
// 
//   public deleteGenre(genreName: string): void {
//     super.deleteGenre(genreName);
//     this.database.set("genres", this.genres).write();
//   }
// 
//   public addNewArtist(newArtist: Artist): void {
//     super.addNewArtist(newArtist);
//     this.database.set("artists", this.artists).write();
//   }
// 
//   public deleteArtist(artistName: string): void {
//     super.deleteArtist(artistName);
//     this.database.set("artists", this.artists).write();
//   }
// 
//   public addNewAlbum(newAlbum: Album): void {
//     super.addNewAlbum(newAlbum);
//     this.database.set("albums", this.albums).write();
//   }
// 
//   public deleteAlbum(albumName: string): void {
//     super.deleteAlbum(albumName);
//     this.database.set("albums", this.albums).write();
//   }
// 
//   public addNewGroup(newGroup: Group): void {
//     super.addNewGroup(newGroup);
//     this.database.set("groups", this.groups).write();
//   }
// 
//   public deleteGroup(groupName: string): void {
//     super.deleteGroup(groupName);
//     this.database.set("groups", this.groups).write();
//   }
// 
//   public addNewSong(newSong: Song): void {
//     super.addNewSong(newSong);
//     this.database.set("songs", this.songs).write();
//   }
// 
//   public deleteSong(songName: string): void {
//     super.deleteSong(songName);
//     this.database.set("songs", this.songs).write();
//   }
// 
//   public addNewPlayList(newPlayList: PlayList): void {
//     super.addNewPlayList(newPlayList);
//     this.database.set("playlists", this.playlists).write();
//   }
// 
//   public deletePlayList(playlistName: string): void {
//     super.deletePlayList(playlistName);
//     this.database.set("playlists", this.playlists).write();
//   }
}

