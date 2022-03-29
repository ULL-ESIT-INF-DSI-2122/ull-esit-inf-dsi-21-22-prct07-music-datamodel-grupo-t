export type GenreName = 
  "Rap" | "Pop" | "K-Pop" | "Rock" | "Electro" | "Classic" | "Country" |
  "Heavy" | "Jazz" | "Salsa" | "Flamenco" | "Folk" | "Country" | "Blues" |
  "Reggaeton" | "Punk" | "Reggae" | "Soul" | "Gospel" | "Funk" | "Disco" | "Hip Hop"


export class Genre {
  constructor(private name: GenreName, private artists: string[], 
    private albums: string[], private songs: string[]) {}

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

  public getArtist(artist: string) {
      const index: number = this.artists.indexOf(artist);
      return this.artists[index];
  }

  public getAlbum(album: string) {
      const index: number = this.albums.indexOf(album);
      return this.albums[index];
  }

  public getSong(song: string) {
      const index: number = this.songs.indexOf(song);
      return this.songs[index];
  }

  public setName(name: GenreName) {
      this.name = name;
  }

  // // Implementar cuando tengamos clase artistas
  // public setArtistas(artistas: string[]) {
  //     this.bilblioArtistas = artistas;
  // }

  // public setAlbumes(albumes: string[]) {
  //     this.biblioAlbumes = albumes;
  // }

  // public setCanciones(canciones: string[]) {
  //     this.biblioCanciones = canciones;
  // }

  // public addArtista(artista: string) {
  //     this.bilblioArtistas.push(artista);
  // }

  // public addAlbum(album: string) {
  //     this.biblioAlbumes.push(album);
  // }

  // public addCancion(cancion: string) {
  //     this.biblioCanciones.push(cancion);
  // }

  // public deleteArtista(artista: string) {
  //     const indice: number = this.bilblioArtistas.indexOf(artista);
  //     this.bilblioArtistas.splice(indice, 1);
  // }

  // public deleteAlbum(album: string) {
  //     const indice: number = this.biblioAlbumes.indexOf(album);
  //     this.biblioAlbumes.splice(indice, 1);
  // }

  // public deleteCancion(cancion: string) {
  //     const indice: number = this.biblioCanciones.indexOf(cancion);
  //     this.biblioCanciones.splice(indice, 1);
  // }
}