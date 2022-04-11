import {Artist, ArtistInterface} from '../models/artist'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { Genre, GenreName } from '../models/genre';
import { Group } from '../models/group';
import { Album } from '../models/album';
import { Song } from '../models/song';


interface ArtistSchemaInterface {
  artists: ArtistInterface[];
}

export class DataArtistManager {
  private artists: Artist[];
  private database: lowdb.LowdbSync<ArtistSchemaInterface> = lowdb(new FileSync("./src/data/ArtistCollection.json"));

  public constructor(artists: Artist[] = []) {
    this.artists = artists;
    if (!this.database.has("artists").value()) {
      this.exportData(artists);
    }
  }

  public exportData(artistsData: Artist[]) {
    let dbData: ArtistSchemaInterface = {artists: []};
    // Se escriben los artistas
    artistsData.forEach((artist) => {
      let name = artist.getName();
      let groupsNames: string[] = [];
      artist.getGroups().forEach((group) => {
        groupsNames.push(group.getName());
      });
      let genresNames: GenreName[] = [];
      artist.getGenres().forEach((genre) => {
        genresNames.push(genre.getName());
      });
      let albumsNames: string[] = [];
      artist.getAlbums().forEach((album) => {
        albumsNames.push(album.getName());
      });
      let songsNames: string[] = [];
      artist.getSongs().forEach((song) => {
        songsNames.push(song.getName());
      });
      let views = artist.getMonthlyListeners();

      dbData.artists.push({
        name: name,
        groups: groupsNames,
        genres: genresNames,
        albums: albumsNames,
        songs: songsNames,
        monthlyListeners: views
      });
    });
    this.database.set("artists", dbData.artists).write();
  }

  public writeData(artistsData: Artist[] = []) {
    let dbData: ArtistSchemaInterface = {artists: []};
    // Se escriben los géneros
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
    this.artists = [];
    let dbArtists = this.database.get("artists").value();
    dbArtists.forEach((artist) => {

      const groups: Group[] = [];
      artist.groups.forEach((group) => {
        groups.push(new Group(group));
      });

      const genres: Genre[] = [];
      artist.genres.forEach((genre) => {
        genres.push(new Genre(genre));
      });
      
      const albumns: Album[] = [];
      artist.albums.forEach((album) => {
        albumns.push(new Album(album));
      });

      const songs: Song[] = [];
      artist.songs.forEach((song) => {
        songs.push(new Song(song));
      });
      
      const myArtists = new Artist(artist.name, groups, genres, albumns, songs);
      this.artists.push(myArtists);
    });
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