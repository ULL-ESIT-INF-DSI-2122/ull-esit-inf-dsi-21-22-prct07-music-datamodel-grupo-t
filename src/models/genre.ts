import {Album} from './album';
import {Artist} from './artist';
import { Group } from './group';
import {Song} from './song';

export type GenreName = 
  "Rap" | "Pop" | "K-Pop" | "Rock" | "Electro" | "Classic" | "Country" |
  "Heavy" | "Jazz" | "Salsa" | "Flamenco" | "Folk" | "Country" | "Blues" |
  "Reggaeton" | "Punk" | "Reggae" | "Soul" | "Gospel" | "Funk" | "Disco" | "Hip Hop"


export class Genre {
  constructor(private name: GenreName, private artists: (Artist | Group)[] = [], 
    private albums: Album[] = [], private songs: Song[] = []) {}

  public getName() {
      return this.name;
  }

  public getArtistCollection() {
      return this.artists;
  }

  public getAlbumCollection() {
      return this.albums;
  }

  public getSongCollection() {
      return this.songs;
  }

  public getArtist(artist: Artist | Group) {
      const index: number = this.artists.indexOf(artist);
      return this.artists[index];
  }

  public getAlbum(album: Album) {
      const index: number = this.albums.indexOf(album);
      return this.albums[index];
  }

  public getSong(song: Song) {
      const index: number = this.songs.indexOf(song);
      return this.songs[index];
  }

  public setName(name: GenreName) {
      this.name = name;
  }

  public setArtists(artistas: (Artist | Group)[]) {
      this.artists = artistas;
  }

  public setAlbums(albumes: Album[]) {
      this.albums = albumes;
  }

  public setSongs(canciones: Song[]) {
      this.songs = canciones;
  }

  public addArtists(artista: (Artist | Group)) {
      this.artists.push(artista);
  }

  public addAlbum(album: Album) {
      this.albums.push(album);
  }

  public addSong(cancion: Song) {
      this.songs.push(cancion);
  }

  public deleteArtists(artista: (Artist | Group)) {
      const indice: number = this.artists.indexOf(artista);
      this.artists.splice(indice, 1);
  }

  public deleteAlbum(album: Album) {
      const indice: number = this.albums.indexOf(album);
      this.albums.splice(indice, 1);
  }

  public deleteSong(cancion: Song) {
      const indice: number = this.songs.indexOf(cancion);
      this.songs.splice(indice, 1);
  }
}