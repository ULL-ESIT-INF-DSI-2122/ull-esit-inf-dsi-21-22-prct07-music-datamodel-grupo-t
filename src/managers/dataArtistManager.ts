import {Artist, ArtistInterface} from '../models/artist'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

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
      let genresNames: string[] = [];
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
}