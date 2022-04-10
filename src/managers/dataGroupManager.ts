import {Group, GroupInterface} from '../models/group'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

interface GroupSchemaInterface {
  groups: GroupInterface[];
}

export class DataGroupManager {
  private groups: Group[];
  private database: lowdb.LowdbSync<GroupSchemaInterface> = lowdb(new FileSync("./src/data/GroupCollection.json"));

  public constructor(groups: Group[] = []) {
    this.groups = groups;
    if (!this.database.has("groups").value()) {
      this.exportData(groups);
    }
  }

  public exportData(groupData: Group[]): void {
    let dbData: GroupSchemaInterface = {groups: []};
    // Se escriben los grupos
    groupData.forEach((group) => {
      let name = group.getName();
      let artistsName: string[] = [];
      group.getArtists().forEach((artist) => {
        artistsName.push(artist.getName());
      });
      let year = group.getYearOfCreation();
      let genresNames: string[] = [];
      group.getRelatedGenres().forEach((genre) => {
        genresNames.push(genre.getName());
      });
      let albumsNames: string[] = [];
      group.getAlbums().forEach((album) => {
        albumsNames.push(album.getName());
      });
      let views = group.getMonthlyListeners();

      dbData.groups.push({
        name: name,
        artists: artistsName,
        year: year,
        genres: genresNames,
        albums: albumsNames,
        monthlyListeners: views
      });
    });
    this.database.set("groups", dbData.groups).write();
  }
}