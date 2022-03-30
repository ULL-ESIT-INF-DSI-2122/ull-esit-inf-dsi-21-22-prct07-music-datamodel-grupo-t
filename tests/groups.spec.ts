import 'mocha';
import {expect} from 'chai';
import {Genre} from '../src/genre'
import {Album} from '../src/album'
import {Song} from '../src/song';
import {Artist} from '../src/artist';
import {Group} from '../src/group';


describe('Groups class function tests', () => {
  let song = new Song("Song", "Paul", 120, [], false, 12);
  let album = new Album("", "Paul", 2000, [], [song]);
  let pop = new Genre("Pop", [], [], []);
  let artist1 = new Artist("Paul", [], [pop], [album], [song]);
  let artist2 = new Artist("Zero", [], [pop], [album], [song]);
  let imagine = new Group("Imagine", [artist1, artist2], 2000, [pop], [album], 120);

  it('It creates a new instance of an object with class Group', () => {
    expect(imagine).to.be.instanceOf(Group);
  });

  it('It has an attributes for its name', () => {
    expect(imagine.getName()).to.be.equal("Imagine");
  });

  it('It has an attribute for its artists', () => {
    expect(imagine.getArtists()).to.be.eql([artist1, artist2]);
  });

  it('It has an attribute for its genres', () => {
    expect(imagine.getRelatedGenres()).to.be.eql([pop]);
  });

  it('It has an attribute for its albums', () => {
    expect(imagine.getAlbums()).to.be.eql([album]);
  });

  it('It has an attribute for its year of creation', () => {
    expect(imagine.getYearOfCreation()).to.be.equal(2000);
  });

  it('It has an attribute for its monthly listeners', () => {
    expect(imagine.getMonthlyListeners()).to.be.equal(120);
  });

  it('There is a method to add an artist to the group', () => {
    let artist3 = new Artist("", [], [], [], [])
    imagine.addArtist(artist3);
    expect(imagine.getArtists()).to.be.eql([artist1, artist2, artist3]);
  });
});