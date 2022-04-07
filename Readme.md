# Practica 7 - Digitalizando la colección de música de los abuelos
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct07-music-datamodel-grupo-t)

### Universidad de La Laguna
### Desarrollo de Sistemas Informáticos
### Tanausú Falcón Casanova
### Juan Marrero Domínguez
### Diego Rodríguez Pérez
***
## 1. Introducción

En esta práctica, tendremos que llevar a cabo un diseño orientado a objetos del modelo de datos de un sistema de información que permita almacenar una biblioteca de música.
Los modelos de datos están alojados en el directorio *src*. Para el desarrollo de la metodología *TDD* hemos hecho uso de las herramientas *Mocha* y *Chai*. Cada módulo de datos cuenta con sus propias pruebas en el directorio *tests*. En cuanto a la documentación se ha generado mediante *TypeDoc*. Para verla simplemente tendremos que acceder al directorio *docs* y abrir el fichero *index.html*.

## 2. Objetivos

La realización de esta práctica tiene como objetivo aprender:

- Los modelos de datos en TypeScript.
- Utilizar los módulos de *Inquirer.js* y *Lowdb*.
- Comunicarse a través de *GitHub Issues*.

## 3. Modelos de datos a implementar

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
