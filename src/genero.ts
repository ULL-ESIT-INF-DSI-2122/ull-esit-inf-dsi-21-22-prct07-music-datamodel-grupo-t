export class Genero {

    constructor(private nombre: string, private bilblioArtistas: string[], private biblioAlbumes: string[], private biblioCanciones: string[]) {}

    public getNombre() {
        return this.nombre;
    }

    public getArtistas() {
        return this.bilblioArtistas;
    }

    public getAlbumes() {
        return this.biblioAlbumes;
    }

    public getCanciones() {
        return this.biblioCanciones;
    }

    public getArtista(artista: string) {
        const indice: number = this.bilblioArtistas.indexOf(artista);
        return this.bilblioArtistas[indice];
    }

    public getAlbum(album: string) {
        const indice: number = this.biblioAlbumes.indexOf(album);
        return this.biblioAlbumes[indice];
    }

    public getCancion(cancion: string) {
        const indice: number = this.biblioCanciones.indexOf(cancion);
        return this.biblioCanciones[indice];
    }

    public setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public setArtistas(artistas: string[]) {
        this.bilblioArtistas = artistas;
    }

    public setAlbumes(albumes: string[]) {
        this.biblioAlbumes = albumes;
    }

    public setCanciones(canciones: string[]) {
        this.biblioCanciones = canciones;
    }

    public addArtista(artista: string) {
        this.bilblioArtistas.push(artista);
    }

    public addAlbum(album: string) {
        this.biblioAlbumes.push(album);
    }

    public addCancion(cancion: string) {
        this.biblioCanciones.push(cancion);
    }

    public deleteArtista(artista: string) {
        const indice: number = this.bilblioArtistas.indexOf(artista);
        this.bilblioArtistas.splice(indice, 1);
    }

    public deleteAlbum(album: string) {
        const indice: number = this.biblioAlbumes.indexOf(album);
        this.biblioAlbumes.splice(indice, 1);
    }

    public deleteCancion(cancion: string) {
        const indice: number = this.biblioCanciones.indexOf(cancion);
        this.biblioCanciones.splice(indice, 1);
    }
}