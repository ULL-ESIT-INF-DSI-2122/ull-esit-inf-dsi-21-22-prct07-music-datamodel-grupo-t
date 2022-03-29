
export class Song {
  constructor(private name: string, private author: string, 
    private duration: number, private genre: string, 
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

  public getGenre() {
    return this.genre;
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

  public setGenre(newGenre: string) {
    this.genre = newGenre;
  }

  public setIsSingle(newBool: boolean) {
    this.isSingle = newBool;
  }

  public setViews(newViews: number) {
    this.views = newViews;
  }
}
