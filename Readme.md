# Practica 7 - Digitalizando la colección de música de los abuelos
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t/actions/workflows/tests.yml/badge.svg?branch=master)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t/badge.svg)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t)

### Desarrollo de Sistemas Informáticos - Universidad de La Laguna
#### Miembros:
* Tanausú Falcón Casanova
* Juan Marrero Domínguez
* Diego Rodríguez Pérez


## 1. Introducción

En esta práctica, tendremos que llevar a cabo un diseño orientado a objetos del modelo de datos de un sistema de información que permita almacenar una biblioteca de música.
Los modelos de datos están alojados en el directorio *src*. Para el desarrollo de la metodología *TDD* hemos hecho uso de las herramientas *Mocha* y *Chai*. Cada módulo de datos cuenta con sus propias pruebas en el directorio *tests*. En cuanto a la documentación se ha generado mediante *TypeDoc*. Para verla simplemente tendremos que acceder al directorio *docs* y abrir el fichero *index.html*.

## 2. Objetivos

La realización de esta práctica tiene como objetivo aprender:

- Los modelos de datos en TypeScript.
- Utilizar los módulos de *Inquirer.js* y *Lowdb*.
- Comunicarse a través de *GitHub Issues*.

## 3. Implementación

Vamos a dividir la implementación en modelos de datos y en managers. En los modelos de datos definiremos las entidades pedidas en la práctica, y los managers los utilizaremos para manejar la información en la base de datos relacionada a estos.

### Modelo de Datos 1 - Géneros Musicales (*Genre*)
#### Código
```ts
import {Album} from './album';
import {Artist} from './artist';
import { Group } from './group';
import {Song} from './song';

export type GenreName = 
  "Rap" | "Pop" | "Trap" | "Rock" | "Electro" | "Classic" | "Country" |
  "Heavy" | "Jazz" | "Salsa" | "Flamenco" | "Folk" | "Country" | "Blues" |
  "Reggaeton" | "Punk" | "Reggae" | "Soul" | "Gospel" | "Popular" | "Disco" | "Hip Hop"


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
```
#### Explicación
En este modelo de datos se representa la información relativa a los Géneros Musicales. Se ha desarrollado un tipo de datos `GenreName` para limitar los géneros iniciales. Cada género cuenta con los siguientes atributos:
* **name**: Contiene el nombre del Género Musical.
* **artists**: Vector que contienen los grupos y artistas que pertenecen al género.
* **albums**: Vector que contienen los álbums que pertenecen al género.
* **songs**: Vector que contienen las canciones que pertenecen al género.

#### Pruebas
![Prueba1](/Assets/Tests/Screenshot_1.png)

### Modelo de Datos 2 - Canciones (*Songs*)
#### Código
```ts
import {Genre} from './genre'

export type Duration = {
  minutes: number,
  seconds: number
}
export class Song {
  constructor(private name: string, private author: string = '', 
    private duration: Duration = {minutes: 0, seconds: 0}, private genres: Genre[] = [], 
    private isSingle: boolean = true, private views: number = 0) {}

  public getName() {
    return this.name;
  }

  public getAuthor() {
    return this.author;
  }

  public getDuration(): Duration {
    return this.duration;
  }

  public getGenres() {
    return this.genres;
  }

  public getIsSingle() {
    return this.isSingle;
  }

  public getViews() {
    return this.views;
  }

  public setName(newName: string) {
    this.name = newName;
  }

  public setAuthor(newAuthor: string) {
    this.author = newAuthor;
  }

  public setDuration(newDuration: Duration) {
    this.duration = newDuration;
  }

  public setGenres(newGenres: Genre[]) {
    this.genres = newGenres;
  }

  public setIsSingle(newBool: boolean) {
    this.isSingle = newBool;
  }

  public setViews(newViews: number) {
    this.views = newViews;
  }
}

```
#### Explicación
En este modelo de datos se representa la información relativa a las Canciones. Se ha desarrollado un tipo de datos `Duration` para expresar en minutos y segundos la duración de la canción. Cada canción cuenta con los siguientes atributos:
* **name**: Contiene el nombre de la canción.
* **author**: Contiene el nombre del artista.
* **duration**: Vector que contienen los álbums que pertenecen al género.
* **genres**: Vector que contienen las canciones que pertenecen al género.
* **isSingle**: Vector que contienen las canciones que pertenecen al género.
* **views**: Vector que contienen las canciones que pertenecen al género.

#### Pruebas
![Prueba2](/Assets/Tests/Screenshot_2.png)

### Modelo de Datos 3 - Álbums (*Album*)
#### Código
```ts
import {Genre} from './genre'
import {Song} from './song'

export class Album implements Iterable<Song> {
  private songs: Set<Song>;

  constructor(private name: string, private artist: string = '',
    private year: number = 0, private genres: Genre[] = [], songs: Song[] = []) {
      this.songs = new Set(songs);
  }

  public getName(): string {
    return this.name;
  }

  public getArtist(): string {
    return this.artist;
  }

  public getYear(): number {
    return this.year;
  }

  public getGenres(): Genre[] {
    return this.genres;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setArtist(artist: string): void {
    this.artist = artist;
  }

  public setYear(year: number): void {
    this.year = year;
  }

  public setGenre(genre: Genre[]): void {
    this.genres = genre;
  }

  [Symbol.iterator](): Iterator<Song> {
    return this.songs.values();
  }

  public getSong(name: string): Song | undefined {
    return [...this].find((song) => 
      song.getName() === name);
  }

  public getNumberOfSongs(): number {
    return this.songs.size;
  }

  public addSong(newSong: Song): void {
    this.songs.add(newSong);
  }

  public removeSong(songName: string): void {
    [...this].forEach((song) => {
      if (song.getName() === songName) {
        this.songs.delete(song)
      }
    });
  }
}
```
#### Explicación
En este modelo de datos se representa la información relativa a los álbumes. Cada álbum cuenta con los siguientes atributos:
* **name**: Contiene el nombre del álbum.
* **artist**: Contiene el nombre del artista que publica el álbum.
* **year**: Año en el que se publica el álbum.
* **genres**: Géneros musicales a los que pertenece el álbum.
* **songs**: Canciones que contiene el álbum.


#### Pruebas
![Prueba3](/Assets/Tests/Screenshot_3.png)

### Modelo de Datos 4 - Grupos (*Group*)
#### Código
```ts
import {Album} from './album';
import {Artist} from './artist';
import {Genre} from './genre';

export class Group {
  constructor(private name: string, private artists: Artist[] = [], private yearOfCreation: number = 0,
      private relatedGenres: Genre[] = [], private albums: Album[] = [], private monthlyListeners: number = 0) {
  }

  public getName(): string {
    return this.name;
  }

  public getArtists(): Artist[] {
    return this.artists;
  }

  public getYearOfCreation(): number {
    return this.yearOfCreation;
  }

  public getRelatedGenres(): Genre[] {
    return this.relatedGenres;
  }

  public getAlbums(): Album[] {
    return this.albums;
  }

  public getMonthlyListeners(): number {
    return this.monthlyListeners;
  }

  public addArtist(artist: Artist): void {
    this.artists.push(artist);
  }
}
```
#### Explicación
En este modelo de datos se representa la información relativa a las Grupos. Cada canción cuenta con los siguientes atributos:
* **name**: Contiene el nombre del grupo.
* **artists**: Contiene los nombre de los artistas que forman el grupo.
* **yearOfCreation**: Año de la creación del grupo.
* **relatedGenres**: Géneros a los que pertenece el grupo.
* **albums**: Álbumes lanzados por el grupo.
* **monthlyListeners**: Cantidad de oyentes mensuales.

#### Pruebas
![Prueba4](/Assets/Tests/Screenshot_4.png)

### Modelo de Datos 5 - Artistas (*Artist*)
#### Código
```ts
import {Album} from './album';
import {Group} from './group';
import {Song} from './song';
import {Genre} from './genre';

export class Artist {
  private monthlyListeners: number;

  constructor(private name: string, private groups: Group[] = [], private genres: Genre[] = [],
      private albums: Album[] = [], private publishedSongs: Song[] = []) {
    let listeners = 0;
    this.groups.forEach((group) => {
      listeners += group.getMonthlyListeners();
     });
    this.monthlyListeners = listeners;
  }

  public getName(): string {
    return this.name;
  }

  public getGroups(): Group[] {
    return this.groups;
  }

  public getGenres(): Genre[] {
    return this.genres;
  }

  public getAlbums(): Album[] {
    return this.albums;
  }

  public getPublishedSongs(): Song[] {
    return this.publishedSongs;
  }

  public getMonthlyListeners(): number {
    return this.monthlyListeners;
  }
}
```
#### Explicación
En este modelo de datos se representa la información relativa a los Artistas. Cada Artista cuenta con los siguientes atributos:
* **name**: Contiene el nombre del artista.
* **groups**: Grupos a los que pertenece el artista.
* **genres**: Géneros a los que pertenece el artista.
* **albums**: Álbumes en los que ha participado el artista.
* **publishedSongs**: Canciones publicadas por el artista.

#### Pruebas
![Prueba5](/Assets/Tests/Screenshot_5.png)

### Modelo de Datos 6 - Artistas (*PlayLists*)
#### Código
```ts
import {Song, Duration} from './song';
import {Genre, GenreName} from './genre';

export interface PlaylistInterface {
  name: string;
  songs: string[];
  duration: {minutes: number, seconds: number};
  genres: GenreName[];
}

export class PlayList {
  constructor(private name: string, private songs: Song[] = [],
      private duration: Duration = {minutes: 0, seconds: 0},
      private genres: Genre[] = []) {
  }

  public getName(): string {
    return this.name;
  }

  public getSongs(): Song[] {
    return this.songs;
  }

  public getDuration(): Duration {
    return this.duration;
  }

  public getGenres(): Genre[] {
    return this.genres;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setGenres(genres: Genre[]): void {
    this.genres = genres;
  }

  public addSong(song: Song): void {
    this.songs.push(song);
  }

  public addGenre(genre: Genre): void {
    this.genres.push(genre);
  }

  public removeSong(songName: string): void {
    this.songs.forEach((song, index) => {
      if (song.getName() === songName) {
        this.songs.splice(index, 1);
      }
    });
  }

  public removeGenre(newGenre: Genre): void {
    this.genres.forEach((genre, index) => {
      if (genre === newGenre) {
        this.genres.splice(index, 1);
      }
    });
  }

  public getNumberOfSongs(): number {
    return this.songs.length;
  }
}
```
#### Explicación
En este modelo de datos se representa la información relativa a las PlayLists. Cada PlayList cuenta con los siguientes atributos:
* **name**: Contiene el nombre de la playlist.
* **songs**: Canciones que contiene la playlist.
* **duration**: Duración de la playlist.
* **genres**: Géneros incluidos en la playlist.


#### Pruebas
![Prueba5](/Assets/Tests/Screenshot_6.png)

### Manager de Datos 1 - Géneros Musicales (*DataGenreManager*)
#### Código
```ts
import {Genre, GenreInterface, GenreName} from '../models/genre'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {Song} from '../models/song';
import {Artist} from '../models/artist';
import {Album} from '../models/album';

export interface GenreSchemaInterface {
  genres: GenreInterface[];
}

export class DataGenreManager {
  private genres: Genre[];
  private database: lowdb.LowdbSync<GenreSchemaInterface> = lowdb(new FileSync('./src/data/GenreCollection.json'));

  public constructor(genres: Genre[] = []) {
    this.genres = genres;
    if (!this.database.has("genres").value()) {
      this.writeData(genres);
    } else {
      this.readData();
    }
  }

  public getGenres(): Genre[] {
    return this.genres;
  }

  public getDefinedGenre(genreName: GenreName): Genre | undefined {
    for (let i = 0; i < this.genres.length; i++) {
      if (genreName === this.genres[i].getName()) {
        return this.genres[i];
      }
    }
    return undefined;
  }

  public getGenreNames(): GenreName[] {
    let genreNames: GenreName[] = [];
    this.genres.forEach((genre) => {
      genreNames.push(genre.getName());
    });
    return genreNames;
  }

  public writeData(genresData: Genre[] = []) {
    let dbData: GenreSchemaInterface = {genres: []};

    genresData.forEach((genre) => {
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

      dbData.genres.push({
        name: name,
        artists: artistsNames,
        albums: albumsNames,
        songs: songsNames
      });
    });
    this.database.set("genres", dbData.genres).write();
  }

  public readData(): void {
    this.genres = [];
    let dbGenres = this.database.get("genres").value();
    dbGenres.forEach((genre) => {

      let artists: Artist[] = [];
      genre.artists.forEach((artist) => {
        artists.push(new Artist(artist));
      });

      let albums: Album[] = [];
      genre.albums.forEach((album) => {
        albums.push(new Album(album));
      });

      let songs: Song[] = [];
      genre.songs.forEach((song) => {
        songs.push(new Song(song));
      });
      let myGenre = new Genre(genre.name, artists, albums, songs);
      this.genres.push(myGenre);
    });
  }

  public addNewGenre(newGenre: Genre): number {
    let alreadyInGenres = false;
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].getName() === newGenre.getName()) {
        alreadyInGenres = true;
        break;
      }
    }
    if (alreadyInGenres) {
      return -1;
    } else {
      this.genres.push(newGenre);
      this.writeData(this.genres);
      return 0;
    }
  }

  public deleteGenre(genreName: string): void {
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].getName() === genreName) {
        this.genres.splice(i, 1);
        break;
      }
    }
    this.writeData(this.genres);
  }
}
```
#### Explicación
En este manager de datos se representa el manejo de datos relativo a los Géneros Musicales. Este manager cuenta con los siguientes atributos:
* **genres**: Vector que contiene los Géneros Musicales definidos en la base de datos.
* **database**: Permite acceder a la base de datos los Géneros Musicales.

#### Pruebas
![Prueba1](/Assets/Tests/Screenshot_7.png)

### Manager de Datos 2 - Canciones (*DataSongManager*)
#### Código
```ts
import {Song, SongInterface} from '../models/song'
import {Genre, GenreName} from '../models/genre'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {DataGenreManager} from './dataGenreManager'; 

export interface SongSchemaInterface {
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

  public getDefinedSong(songName: string): Song | undefined{
    for (let i = 0; i < this.songs.length; i++) {
      if (songName === this.songs[i].getName()) {
        return this.songs[i];
      }
    }
    return undefined;
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

  public deleteSong(songName: string): void {
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i].getName() === songName) {
        this.songs.splice(i, 1);
      }
    }
    this.writeData(this.songs);
  }

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
```
#### Explicación
En este manager de datos se representa el manejo relativa a las Canciones. Cada canción manager cuenta con los siguientes atributos:
* **songs**: Vector que contiene las instancias de las Canciones.
* **database**: Permite acceder a la base de datos de las Canciones.

#### Pruebas
![Prueba8](/Assets/Tests/Screenshot_8.png)

### Manager de Datos 3 - Álbums (*DataAlbumManager*)
#### Código
```ts
import {Album, AlbumInterface} from '../models/album';
import {Genre, GenreName} from '../models/genre';
import {Song} from '../models/song';
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

export interface AlbumSchemaInterface {
  albums: AlbumInterface[];
}

export class DataAlbumManager {
  private albums: Album[];
  private database: lowdb.LowdbSync<AlbumSchemaInterface> = lowdb(new FileSync("./src/data/AlbumCollection.json"));

  public constructor(albums: Album[] = []) {
    this.albums = albums;
    if (!this.database.has("albums").value()) {
      this.writeData(albums);
    } else {
      this.readData();
    }
  }

  public writeData(albumData: Album[]): void {
    let dbData: AlbumSchemaInterface = {albums: []};
  
    albumData.forEach((album) => {
      let name = album.getName();
      let artist = album.getArtist();
      let year = album.getYear();
      let genresNames: GenreName[] = [];
      album.getGenres().forEach((genre) => {
        genresNames.push(genre.getName());
      });
      let songsNames: string[] = [];
      [...album].forEach((song) => {
        songsNames.push(song.getName());
      });

      dbData.albums.push({
        name: name,
        artists: artist,
        year: year,
        genres: genresNames,
        songs: songsNames
      });
    });
    this.database.set("albums", dbData.albums).write();
  }

  public readData() {
    this.albums = [];
    let dbAlbums = this.database.get("albums").value();
    dbAlbums.forEach((album) => {

      let genres: Genre[] = [];
      album.genres.forEach((genre) => {
        genres.push(new Genre(genre));
      });

      let songs: Song[] = [];
      album.songs.forEach((song) => {
        songs.push(new Song(song));
      });
      let myAlbum = 
        new Album(album.name, album.artists, album.year, genres, songs);
      this.albums.push(myAlbum);
    });
  }

  public getAlbums(): Album[] {
    return this.albums;
  }

  public getDefinedAlbum(albumName: string): Album | undefined {
    for (let i = 0; i < this.albums.length; i++) {
      if (albumName === this.albums[i].getName()) {
        return this.albums[i];
      }
    }
    return undefined;
  }
  
  public getAlbumsNames(): string[] {
    const names: string[] = [];
    this.albums.forEach(album => {
      names.push(album.getName());
    });
    return names;
  }

  public addNewAlbum(newAlbum: Album): number {
    let alreadyInAlbums = false;
    for (let i = 0; i < this.albums.length; i++) {
      if ((this.albums[i].getName() === newAlbum.getName()) &&
        (this.albums[i].getArtist() === newAlbum.getArtist())) {
        alreadyInAlbums = true;
        break;
      }
    }
    if (alreadyInAlbums) {
      return -1;
    } else {
      this.albums.push(newAlbum);
      this.writeData(this.albums);
      return 0;
    }
  }

  public deleteAlbum(albumName: string): void {
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i].getName() === albumName) {
        this.albums.splice(i, 1);
      }
    }
    this.writeData(this.albums);
  }
}
```
#### Explicación
En este manager de datos se representa el manejo relativa a los Albums. Cada álbum manager cuenta con los siguientes atributos:
* **albums**: Vector que contiene las instancias de los álbumes.
* **database**: Permite acceder a la base de datos de los Álbumes.

#### Pruebas
![Prueba9](/Assets/Tests/Screenshot_9.png)

### Manager de Datos 4 - Grupos (*DataGroupManager*)
#### Código
```ts
import {Group, GroupInterface} from '../models/group'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {Artist} from '../models/artist';
import {Genre, GenreName} from '../models/genre';
import {Album} from '../models/album';

 export interface GroupSchemaInterface {
  groups: GroupInterface[];
}

export class DataGroupManager {
  private groups: Group[];
  private database: lowdb.LowdbSync<GroupSchemaInterface> = lowdb(new FileSync("./src/data/GroupCollection.json"));

  public constructor(groups: Group[] = []) {
    this.groups = groups;
    if (!this.database.has("groups").value()) {
      this.writeData(groups);
    } else {
      this.readData();
    }
  }

  public getGroups(): Group[] {
    return this.groups;
  }

  public getDefinedGroup(groupName: string): Group | undefined {
    for (let i = 0; i < this.groups.length; i++) {
      if (groupName === this.groups[i].getName()) {
        return this.groups[i];
      }
    }
    return undefined;
  }

  public getGroupNames(): string[] {
    const names: string[] = [];
    this.groups.forEach(group => {
      names.push(group.getName());
    });
    return names;
  }
  
  public writeData(groupData: Group[] = []) {
    const dbData: GroupSchemaInterface = {groups: []};
  
    groupData.forEach(group => {
      const genres: GenreName[] = [];
      group.getRelatedGenres().forEach((genre) => {
        genres.push(genre.getName());
      });

      const albumsNames: string[] = [];
      group.getAlbums().forEach((album) => {
        albumsNames.push(album.getName());
      });

      const artistNames: string[] = [];
      group.getArtists().forEach((artist) => {
        artistNames.push(artist.getName());
      });

      dbData.groups.push({
        name: group.getName(),
        artists: artistNames,
        year: group.getYearOfCreation(),
        genres: genres,
        albums: albumsNames,
        monthlyListeners: group.getMonthlyListeners()
      });
    });
    this.database.set("groups", dbData.groups).write();
  }

  public readData(): void {
    this.groups = [];
    const dbGroups = this.database.get("groups").value();

    dbGroups.forEach(group => {
      const artists: Artist[] = [];
      group.artists.forEach((artist) => {
        artists.push(new Artist(artist));
      });

      const genres: Genre[] = [];
      group.genres.forEach((genre) => {
        genres.push(new Genre(genre));
      });

      const albumns: Album[] = [];
      group.albums.forEach((album) => {
        albumns.push(new Album(album));
      });

      const myGroup = new Group(group.name, artists, 
          group.year, genres, albumns, group.monthlyListeners)
      this.groups.push(myGroup);
    });
  }

  public addNewGroup(newGroup: Group): number {
    let alreadyInGroup = false;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].getName() === newGroup.getName()) {
        alreadyInGroup = true;
        break;
      }
    }
    if (alreadyInGroup) {
      return -1;
    } else {
      this.groups.push(newGroup);
      this.writeData(this.groups);
      return 0;
    }
  }

  public deleteGroup(groupName: string) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].getName() === groupName) {
        this.groups.splice(i, 1);
      }
    }
    this.writeData(this.groups);
  }
}
```
#### Explicación
En este manager de datos se representa el manejo relativa a los Grupos. Cada grupo manager cuenta con los siguientes atributos:
* **songs**: Vector que contiene las instancias de los Grupos.
* **database**: Permite acceder a la base de datos de los Grupos.

#### Pruebas
![Prueba10](/Assets/Tests/Screenshot_10.png)

### Manager de Datos 5 - Artistas (*DataArtistManager*)
#### Código
```ts
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {Genre, GenreName} from '../models/genre';
import {Artist, ArtistInterface} from '../models/artist'
import {Group} from '../models/group';
import {Album} from '../models/album';
import {Song} from '../models/song';
import {DataSongManager} from './dataSongManager'; 
import {DataGroupManager} from './dataGroupManager'; 
import {DataAlbumManager} from './dataAlbumManager';
import {DataGenreManager} from './dataGenreManager'; 

export interface ArtistSchemaInterface {
  artists: ArtistInterface[];
}

export class DataArtistManager {
  private artists: Artist[];
  private database: lowdb.LowdbSync<ArtistSchemaInterface> = lowdb(new FileSync("./src/data/ArtistCollection.json"));

  public constructor(artists: Artist[] = []) {
    this.artists = artists;
    if (!this.database.has("artists").value()) {
      this.writeData(artists);
    } else {
      this.readData();
    }
  }

  public writeData(artistsData: Artist[] = []) {
    let dbData: ArtistSchemaInterface = {artists: []};

    artistsData.forEach((artist) => {
      let name = artist.getName();
      let genreNames: GenreName[] = [];
      artist.getGenres().forEach((genre) => {
        genreNames.push(genre.getName());
      });
      let groupsNames: string[] = [];
      artist.getGroups().forEach((group) => {
        groupsNames.push(group.getName());
      });
      let albumsNames: string[] = [];
      artist.getAlbums().forEach((album) => {
        albumsNames.push(album.getName());
      });
      let songsNames: string[] = [];
      artist.getSongs().forEach((song) => {
        songsNames.push(song.getName());
      });
      const listeners = artist.getMonthlyListeners();

      dbData.artists.push({
        name: name,
        groups: groupsNames,
        genres: genreNames,
        albums: albumsNames,
        songs: songsNames,
        monthlyListeners: listeners
      });
    });
    this.database.set("artists", dbData.artists).write();
  }

  public readData(): void {
    const dataSongs = new DataSongManager();
    const dataAlbums = new DataAlbumManager();
    const dataGroups = new DataGroupManager();
    const dataGenres = new DataGenreManager();

    this.artists = [];
    const dbArtists = this.database.get("artists").value();
    dbArtists.forEach((artist) => {

      const groups: Group[] = [];
      artist.groups.forEach((group) => {
        groups.push(dataGroups.getDefinedGroup(group) as Group);
      });

      const genres: Genre[] = [];
      artist.genres.forEach((genre) => {
        genres.push(dataGenres.getDefinedGenre(genre) as Genre);
      });
      
      const albumns: Album[] = [];
      artist.albums.forEach((album) => {
        albumns.push(dataAlbums.getDefinedAlbum(album) as Album);
      });

      const songs: Song[] = [];
      artist.songs.forEach((song) => {
        songs.push(dataSongs.getDefinedSong(song) as Song);
      });
      
      const myArtists = new Artist(artist.name, groups, genres, albumns, songs);
      this.artists.push(myArtists);
    });
  }

  public getArtists(): Artist[] {
    return this.artists;
  }

  public getDefinedArtist(artistName: string): Artist | undefined {
    for (let i = 0; i < this.artists.length; i++) {
      if (artistName === this.artists[i].getName()) {
        return this.artists[i];
      }
    }
    return undefined;
  }

  public getArtistNames(): string[] {
    const names: string[] = [];
    this.artists.forEach(artist => {
      names.push(artist.getName());
    });
    return names;
  }

  public addNewArtist(newArtist: Artist): number {
    let alreadyInArtist = false;
    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i].getName() === newArtist.getName()) {
        alreadyInArtist = true;
        break;
      }
    }
    if (alreadyInArtist) {
      return -1;
    } else {
      this.artists.push(newArtist);
      this.writeData(this.artists);
      return 0;
    }
  }

  public deleteArtist(artistName: string) {
    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i].getName() === artistName) {
        this.artists.splice(i, 1);
      }
    }
    this.writeData(this.artists);
  }
}
```
#### Explicación
En este manager de datos se representa el manejo relativa a los Artistas. Cada artista manager cuenta con los siguientes atributos:
* **artists**: Vector que contiene las instancias de los Artistas.
* **database**: Permite acceder a la base de datos de los Artistas.

#### Pruebas
![Prueba11](/Assets/Tests/Screenshot_11.png)

### Manager de Datos 6 - PlayLists (*gestor*)
#### Código
```ts
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {PlayList, PlaylistInterface} from '../models/playlist'
import {Genre, GenreName} from '../models/genre'
import {Group} from '../models/group'
import {Artist} from '../models/artist'
import {DataArtistManager} from './dataArtistManager'
import {DataGroupManager} from './dataGroupManager'
import {Song} from "../models/song";

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

  getPlaylists() {
    return this.playlists;
  }

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


```
#### Explicación
En este manager de datos se representa el manejo relativa a las PlayLists. Cada playlist manager cuenta con los siguientes atributos:
* **songs**: Vector que contiene las instancias de las Playlists.
* **database**: Permite acceder a la base de datos de las Playlists.

#### Pruebas
![Prueba8](/Assets/Tests/Screenshot_8.png)

Los métodos `readData` y `writeData` de cada uno de los managers permitirán leer y almacenar la información guardada en la base de datos, representada en este caso en en ficheros `json` correspondientes al tipo de dato. En estos ficheros, que estarán almacenado bajo el directorio `./src/data`, se cargarán en un principio los datos por defecto del sistema, y a medida que el usuario añada o borre información, estos se irán modificando gracias a los métodos proporcionados por los managers.

## Fichero app.ts
En este fichero es donde hemos llevado a cabo la gestión de todo el programa. Hemos realizado diferentes menús con los que se muestra al usuario las diferentes posibilidades que tiene. Este control se ha hecho mediante el uso de funciones que determinan las opciones del menú que el usuario tiene disponible. Es decir, si el usuario elige gestionar canciones, se direccionará al menú de canciones mediante una función, la cual le permitirá tanto crear, borrar y modificar las canciones que desee. La estructura que se ha seguido para el resto de funcionalidades es idéntica.

En cuanto a la base de datos anteriormente nombrada, los ficheros `json` se generarán automáticamente con la primera ejecución del programa, y en sesiones posteriores los managers simplemente leerán la información de estos y almacenarán las instancias de los objetos correspondientes, con la información relativa a canciones, artistas, etc. Todos los datos iniciales que el programa carga por defecto son guardados en el fichero `defaultData` del directorio `data`.

## Conclusión
En esta práctica, hemos tenido la oportunidad de crear una aplicación interactiva por consola, que nos ha permitido comprender el funcionamiento en profundidad de TypeScript, así como el manejo de datos en diferentes ficheros `json`. De esta manera, gracias al uso de paquetes externos como `lowdb` e `inquirer`, se ha determinado las necesidades que son requeridas en un diseño interactivo, lo que nos ha permitido aprender y mejorar para futuros diseños. Con todo ello, creemos que esta práctica ha sido de gran utilidad en nuestro desarrollo como programadores.
