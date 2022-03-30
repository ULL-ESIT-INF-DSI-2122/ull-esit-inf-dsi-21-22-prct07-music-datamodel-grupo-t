import {Genre} from './genre'

/*
 * Clase Song que representa las canciones 
 */
export class Song {
  constructor(private name: string, private author: string, 
    private duration: number, private genres: Genre[], 
    private isSingle: boolean, private views: number) {}

  public getName() {
    return this.name;
  }

  public getAuthor() {
    return this.author;
  }

  public getDuration() {
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

  public setDuration(newDuration: number) {
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
