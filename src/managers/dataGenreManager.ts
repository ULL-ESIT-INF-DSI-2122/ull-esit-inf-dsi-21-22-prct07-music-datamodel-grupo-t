import {Genre, GenreInterface, GenreName} from '../models/genre'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {Song} from '../models/song';
import {Artist} from '../models/artist';
import {Album} from '../models/album';

interface GenreSchemaInterface {
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

  // public printGenres(): void {
  //   let currentGenres = this.database.get("genres").value;
  //   console.log(currentGenres);
  // }


  public writeData(genresData: Genre[] = []) {
    let dbData: GenreSchemaInterface = {genres: []};
    // Se escriben los géneros
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
      // Leemos los artistas del género
      let artists: Artist[] = [];
      genre.artists.forEach((artist) => {
        artists.push(new Artist(artist));
      });
      // Leemos los álbumes del género
      let albums: Album[] = [];
      genre.albums.forEach((album) => {
        albums.push(new Album(album));
      });
      // Leemos las canciones del género
      let songs: Song[] = [];
      genre.songs.forEach((song) => {
        songs.push(new Song(song));
      });
      let myGenre = new Genre(genre.name, artists, albums, songs);
      this.genres.push(myGenre);
    });
  }


  public addNewGenre(newGenre: Genre): void {
    let alreadyInGenres = false;
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].getName() === newGenre.getName()) {
        alreadyInGenres = true;
        break;
      }
    }
    if (alreadyInGenres) {
      console.log('Error, ese género ya está definido.');
    } else {
      this.genres.push(newGenre);
      this.writeData(this.genres);
    }
  }


  public deleteGenre(genreName: string): void {
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].getName() === genreName) {
        console.log(this.genres)
        this.genres.splice(i, 1);
        console.log(this.genres)
      }
    }
    this.writeData(this.genres);
  }


  public addSongToGenre(song: Song, genre: GenreName): void {
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].getName() === genre) {
        this.genres[i].getSongCollection().push(song);
        this.writeData(this.genres);
        break;
      }
    }
  }

  public deleteSongOfGenre(song: string, genre: GenreName): void {
    for (let i = 0; i < this.genres.length; i++) {
      if (this.genres[i].getName() === genre) {
        this.genres[i].deleteSong(song);
        this.writeData(this.genres);
        break;
      }
    }
  }
}