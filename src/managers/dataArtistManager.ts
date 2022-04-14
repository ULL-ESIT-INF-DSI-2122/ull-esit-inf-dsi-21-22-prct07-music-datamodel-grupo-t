
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

/**
 * Interface that defines the schema for the Artist class in the database
 */
export interface ArtistSchemaInterface {
  artists: ArtistInterface[];
}

/**
 * Class in charge of manage all the data of the artists in the database
 */
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

  /**
   * This method updates the information stored in the database.
   * @param artistsData data from the artists that will be writen
   */
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

  /**
   * Reads all the information available in the database and stores it. This is 
   * crucial in order to operate with any type of data
   */
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

  /**
   * @returns artists stored
   */
  public getArtists(): Artist[] {
    return this.artists;
  }

  /**
   * Searches an artist by it's name
   * @param artistName name of the artist the method will search
   * @returns that specific artist
   */
  public getDefinedArtist(artistName: string): Artist | undefined {
    for (let i = 0; i < this.artists.length; i++) {
      if (artistName === this.artists[i].getName()) {
        return this.artists[i];
      }
    }
    return undefined;
  }

  /**
   * @returns all artist names in form of array
   */
  public getArtistNames(): string[] {
    const names: string[] = [];
    this.artists.forEach(artist => {
      names.push(artist.getName());
    });
    return names;
  }

  /**
   * Add's a new artist to the database. Calls the write() method in order to update
   * the database
   * @param newArtist artist that will be added
   * @returns 0 or -1 depending of the succes of the operation
   */
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

  /**
   * Deletes an artist, searching it by it's name
   * @param artistName name of the artist that will be deleted
   */
  public deleteArtist(artistName: string) {
    for (let i = 0; i < this.artists.length; i++) {
      if (this.artists[i].getName() === artistName) {
        this.artists.splice(i, 1);
      }
    }
    this.writeData(this.artists);
  }

  /**
   * Checks if an artist is in the database
   * @param artistName string with the name of the artist to check
   * @returns true if artist was found
   */
  public isInArtists(artistName: string): boolean {
    if (this.getArtistNames().includes(artistName)) {
      return true;
    }
    return false;
  }
}