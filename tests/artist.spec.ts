import 'mocha';
import {expect} from 'chai';
import {Genre} from '../src/genre'
import {Album} from '../src/album'
import {Song} from '../src/song';
import {Artist} from '../src/artist';
import {Group} from '../src/group';


describe('Artist class function tests', () => {
  let song = new Song("Song", "Paul", 120, [], false, 12);
  let album = new Album("", "Paul", 2000, [], [song]);
  let pop = new Genre("Pop", [], [], []);
  let imagine = new Group("", [], 0, [], [], 120);
  let fallout = new Group("", [], 0, [], [], 120);
  let artist = new Artist("Paul", [fallout, imagine], [pop], [album], [song]);
  
  it('It creates a new instance of an object with class Artist', () => {
    expect(artist).to.be.instanceOf(Artist);
  });

  it('It has an attributes for its name', () => {
    expect(artist.getName()).to.be.equal("Paul");
  });

  it('It has an attribute for its groups', () => {
    expect(artist.getGroups()).to.be.eql([fallout, imagine]);
  });

  it('It has an attribute for its genres', () => {
    expect(artist.getGenres()).to.be.eql([pop]);
  });

  it('It has an attribute for its albums', () => {
    expect(artist.getAlbums()).to.be.eql([album]);
  });

  it('It has an attribute for its published songs', () => {
    expect(artist.getPublishedSongs()).to.be.eql([song]);
  });

  it('There is a method to get the monthly listeners', () => {
    expect(artist.getMonthlyListeners()).to.be.equal(240);
  });
});