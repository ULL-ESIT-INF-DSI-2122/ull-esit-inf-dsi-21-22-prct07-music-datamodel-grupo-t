import {Group, GroupInterface} from '../models/group'
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {Artist} from '../models/artist';
import {Genre, GenreName} from '../models/genre';
import {Album} from '../models/album';

/**
 * Interface that defines the schema for the Group class in the database
 */
 export interface GroupSchemaInterface {
  groups: GroupInterface[];
}

/**
 * Class in charge of manage all the data of the groups in the database
 */
export class DataGroupManager {
  private groups: Group[];
  private database: lowdb.LowdbSync<GroupSchemaInterface> = lowdb(new FileSync("./src/data/GroupCollection.json"));

  /**
   * Constructor
   * @param groups the class will storage in order to operate with them. 
   */
  public constructor(groups: Group[] = []) {
    this.groups = groups;
    if (!this.database.has("groups").value()) {
      this.writeData(groups);
    } else {
      this.readData();
    }
  }

  /**
   * @returns all the groups stored
   */
  public getGroups(): Group[] {
    return this.groups;
  }

  /**
   * Searches an group by it's name
   * @param groupName name of the group the method will search
   * @returns that specific group
   */
  public getDefinedGroup(groupName: string): Group | undefined {
    for (let i = 0; i < this.groups.length; i++) {
      if (groupName === this.groups[i].getName()) {
        return this.groups[i];
      }
    }
    return undefined;
  }

  /**
   * @returns all group names in form of array
   */
  public getGroupNames(): string[] {
    const names: string[] = [];
    this.groups.forEach(group => {
      names.push(group.getName());
    });
    return names;
  }
  
  /**
   * This method updates the information stored in the database.
   * @param groupData data from the groups that will be writen
   */
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

  /**
   * Reads all the information available in the database and stores it. This is 
   * crucial in order to operate with any type of data
   */
  public readData(): void {
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

  /**
   * Add's a new group to the database. Calls the write() method in order to update
   * the database
   * @param newGroup group that will be added
   * @returns 0 or -1 depending of the succes of the operation
   */
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

  /**
   * Deletes a group, searching it by it's name
   * @param groupName name of the group that will be deleted
   */
  public deleteGroup(groupName: string) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].getName() === groupName) {
        this.groups.splice(i, 1);
      }
    }
    this.writeData(this.groups);
  }

  /**
   * Checks if a group is in the database
   * @param groupName string with the name of the group to check
   * @returns true if the group was found
   */
   public isInGroups(groupName: string): boolean {
    if (this.getGroupNames().includes(groupName)) {
      return true;
    }
    return false;
  }
}