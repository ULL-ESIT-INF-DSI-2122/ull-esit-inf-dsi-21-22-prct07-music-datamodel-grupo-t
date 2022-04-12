import {Group, GroupInterface} from '../models/group'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {Artist} from '../models/artist';
import {Genre, GenreName} from '../models/genre';
import {Album} from '../models/album';
// import {DataArtistManager} from './dataArtistManager'; 
// import {DataAlbumManager} from './dataAlbumManager';
// import {DataGenreManager} from './dataGenreManager'; 

interface GroupSchemaInterface {
  groups: GroupInterface[];
}

export class DataGroupManager {
  private groups: Group[];
  private database: lowdb.LowdbSync<GroupSchemaInterface> = lowdb(new FileSync("./src/data/GroupCollection.json"));

  public constructor(groups: Group[] = []) {
    this.groups = groups;
    if (!this.database.has("groups").value()) {
      this.writeData(groups);
    } else {
      this.readData();
    }
  }

  public getGroups(): Group[] {
    return this.groups;
  }

  public getDefinedGroup(groupName: string): Group | undefined {
    for (let i = 0; i < this.groups.length; i++) {
      if (groupName === this.groups[i].getName()) {
        return this.groups[i];
      }
    }
    return undefined;
  }

  public getGroupNames(): string[] {
    const names: string[] = [];
    this.groups.forEach(group => {
      names.push(group.getName());
    });
    return names;
  }
  
  public writeData(groupData: Group[] = []) {
    const dbData: GroupSchemaInterface = {groups: []};
  
    groupData.forEach(group => {
      const genres: GenreName[] = [];
      group.getRelatedGenres().forEach((genre) => {
        genres.push(genre.getName());
      });

      const albumsNames: string[] = [];
      group.getAlbums().forEach((album) => {
        albumsNames.push(album.getName());
      });

      const artistNames: string[] = [];
      group.getArtists().forEach((artist) => {
        artistNames.push(artist.getName());
      });

      dbData.groups.push({
        name: group.getName(),
        artists: artistNames,
        year: group.getYearOfCreation(),
        genres: genres,
        albums: albumsNames,
        monthlyListeners: group.getMonthlyListeners()
      });
    });
    this.database.set("groups", dbData.groups).write();
  }

  public readData(): void {
    // const dataArtists = new DataArtistManager();
    // const dataAlbums = new DataAlbumManager();
    // const dataGenres = new DataGenreManager();
    this.groups = [];
    const dbGroups = this.database.get("groups").value();

    dbGroups.forEach(group => {
      const artists: Artist[] = [];
      group.artists.forEach((artist) => {
        artists.push(new Artist(artist));
      });

      const genres: Genre[] = [];
      group.genres.forEach((genre) => {
        genres.push(new Genre(genre));
      });

      const albumns: Album[] = [];
      group.albums.forEach((album) => {
        albumns.push(new Album(album));
      });

      const myGroup = new Group(group.name, artists, 
          group.year, genres, albumns, group.monthlyListeners)
      this.groups.push(myGroup);
    });
  }

  public addNewGroup(newGroup: Group): number {
    let alreadyInGroup = false;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].getName() === newGroup.getName()) {
        alreadyInGroup = true;
        break;
      }
    }
    if (alreadyInGroup) {
      return -1;
    } else {
      this.groups.push(newGroup);
      this.writeData(this.groups);
      return 0;
    }
  }

  public deleteGroup(groupName: string) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].getName() === groupName) {
        this.groups.splice(i, 1);
      }
    }
    this.writeData(this.groups);
  }
}