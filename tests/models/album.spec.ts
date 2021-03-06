import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/models/genre'
import {Album} from '../../src/models/album'
import {Song} from '../../src/models/song';


describe('Album class function tests', () => {
  let reggae = new Genre("Reggae", [], [], []);
  let redemtion = new Song("Dracukeo","Kidd Keo",{minutes: 2, seconds: 36} , [reggae], true, 81901392);
  let judge = new Song("Judge Not", "Bob Marley", {minutes: 1, seconds: 34}, [reggae], false, 1239128);
  let album = new Album("Songs of Freedom", "Bob Marley", 1961, [reggae], [redemtion, judge]);
  
  
  it('It creates a new instance of an object with class Combat', () => {
    expect(album).to.be.instanceOf(Album);
  });

  it('It has an attribute for its name', () => {
    expect(album.getName()).to.be.equal("Songs of Freedom");
  });

  it('It has an attribute for its artist', () => {
    expect(album.getArtist()).to.be.equal("Bob Marley");
  });

  it('It has an attribute for its year', () => {
    expect(album.getYear()).to.be.equal(1961);
  });

  it('It has an attribute for its genre', () => {
    expect(album.getGenres()).to.be.eql([reggae]);
  });

  it('There is a method to set the name', () => {
    album.setName("Prueba");
    expect(album.getName()).to.be.equal("Prueba");
  });

  it('There is a method to set the artist', () => {
    album.setArtist("The Weilers");
    expect(album.getArtist()).to.be.equal("The Weilers");
  });

  it('There is a method to set the genre', () => {
    let pop = new Genre("Pop", [], [], []);
    album.setGenre([reggae, pop]);
    expect(album.getGenres()).to.be.eql([reggae, pop]);
  });

  it('There is a method to get a song', () => {
    expect([...album][0]).to.be.eql(redemtion)
  });

  it('There is a method to get the number of songs', () => {
    expect(album.getNumberOfSongs()).to.be.equal(2);
  });

  it('There is a method to add a song', () => {
    let cancion = new Song("Prueba", "Bob Marley", {minutes: 1, seconds: 34}, [reggae], false, 123);
    album.addSong(cancion);
    expect(album.getNumberOfSongs()).to.be.equal(3);
    expect(album.getSong("Prueba")).to.be.equal(cancion);
  });

  it('There is a method to remove a song', () => {
    album.removeSong("Prueba");
    expect(album.getNumberOfSongs()).to.be.equal(2);
    expect(album.getSong("Prueba")).to.be.equal(undefined);
  });
});