import {Genre} from './genre'

/**
 * Mostraremos la duración mediante un tipo personalizado con dos claves
 * con valores numéricos: minutos y segundos
 */
export type Duration = {
  minutes: number,
  seconds: number
}

/*
 * Clase Song que representa las canciones 
 */
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
