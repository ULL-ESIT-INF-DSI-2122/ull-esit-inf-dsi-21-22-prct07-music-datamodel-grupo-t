import {Album} from './album';
import {Group} from './group';
import {Song} from './song';
import {Genre} from './genre';

/**
 * Artist class. Represents the owner of songs, albumns and members of a group
 * potentially
 */
export class Artist {
  /**
   * Stores the monthly listeners of this artist, calculated in the constructor. Takes into
   * account the songs of the group that the artist is member aswell.
   */
  private monthlyListeners: number;

  /**
   * Constructor
   * @param name of the artist
   * @param groups where the artist is member
   * @param genres of the songs of the artist
   * @param albums that the artist has made
   * @param publishedSongs stores the songs that the artist has published
   */
  constructor(private name: string, private groups: Group[] = [], private genres: Genre[] = [],
    private albums: Album[] = [], private publishedSongs: Song[] = []) {
    let listeners = 0;
    
     // En el caso de que cuenten las reproducciones totales
    this.publishedSongs.forEach((song) => {
     listeners += song.getViews();
    });

    this.groups.forEach((group) => {
      group.getAlbums().forEach(album => {
        album.getSongs().forEach(song => {
          listeners += song.getViews();
        });
      });
    });

    this.monthlyListeners = listeners;
  }

  /**
   * @returns the name of the artist
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns the groups that the artist is member of
   */
  public getGroups(): Group[] {
    return this.groups;
  }

  /**
   * @returns the genres of the songs that the artist has made
   */
  public getGenres(): Genre[] {
    return this.genres;
  }
  
  public getSongs(): Song[] {
    return this.publishedSongs;
  }

  /**
   * @returns the albumns that the artist had realased
   */ 
  public getAlbums(): Album[] {
    return this.albums;
  }

  /**
   * @returns all the songs that the artist had realeased
   */
  public getPublishedSongs(): Song[] {
    return this.publishedSongs;
  }

  /**
   * @returns the number of the monthly listeners of the artist
   */
  public getMonthlyListeners(): number {
    return this.monthlyListeners;
  }
}