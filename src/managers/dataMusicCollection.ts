import {Genre} from '../models/genre';
import {Album} from '../models/album';
import {Artist} from '../models/artist';
import {Group} from '../models/group';
import {Song} from '../models/song';
import {PlayList} from '../models/playlist';

export class DataMusicCollection {
  protected genres: Genre[];
  protected artists: Artist[];
  protected albums: Album[];
  protected groups: Group[];
  protected songs: Song[];
  protected playlists: PlayList[];

  public constructor(genres: Genre[] = [], artists: Artist[] = [],
      albums: Album[] = [], groups: Group[] = [], songs: Song[] = [],
      playlists: PlayList[] = []) {
    this.genres = genres;
    this.artists = artists;
    this.albums = albums;
    this.groups = groups;
    this.songs = songs;
    this.playlists = playlists;
  }

  public getGenres(): Genre[] {
    return this.genres;
  }

  public getArtists(): Artist[] {
    return this.artists;
  }

  public getAlbums(): Album[] {
    return this.albums;
  }

  public getGroups(): Group[] {
    return this.groups;
  }

  public getSongs(): Song[] {
    return this.songs;
  }

  public getPlayLists(): PlayList[] {
    return this.playlists;
  }

  public addNewGenre(newGenre: Genre): void {
    this.genres.push(newGenre);
  }

  public deleteGenre(genreName: string): void {
    this.genres.forEach((genre, index) => {
      if (genre.getName() === genreName) {
        this.genres.splice(index, 1);
      }
    });
  }

  public addNewArtist(newArtist: Artist): void {
    this.artists.push(newArtist);
  }

  public deleteArtist(artistName: string): void {
    this.artists.forEach((artist, index) => {
      if (artist.getName() === artistName) {
        this.artists.splice(index, 1);
      }
    });
  }

  public addNewAlbum(newAlbum: Album): void {
    this.albums.push(newAlbum);
  }

  public deleteAlbum(albumName: string): void {
    this.albums.forEach((album, index) => {
      if (album.getName() === albumName) {
        this.albums.splice(index, 1);
      }
    });
  }

  public addNewGroup(newGroup: Group): void {
    this.groups.push(newGroup);
  }

  public deleteGroup(groupName: string): void {
    this.groups.forEach((group, index) => {
      if (group.getName() === groupName) {
        this.groups.splice(index, 1);
      }
    });
  }

  public addNewSong(newSong: Song): void {
    this.songs.push(newSong);
  }

  public deleteSong(songName: string): void {
    this.songs.forEach((song, index) => {
      if (song.getName() === songName) {
        this.songs.splice(index, 1);
      }
    });
  }

  public addNewPlayList(newPlayList: PlayList): void {
    this.playlists.push(newPlayList);
  }

  public deletePlayList(playlistName: string): void {
    this.playlists.forEach((playlist, index) => {
      if (playlist.getName() === playlistName) {
        this.playlists.splice(index, 1);
      }
    });
  }
}