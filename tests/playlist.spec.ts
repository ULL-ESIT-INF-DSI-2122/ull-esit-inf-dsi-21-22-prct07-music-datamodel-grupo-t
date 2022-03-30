import 'mocha';
import {expect} from 'chai';
import {PlayList} from '../src/playlist'
import {Genre} from '../src/genre'
import {Song} from '../src/song';


describe('PlayList class function tests', () => {
  let pop = new Genre("Pop", [], [], []);
  let reggae = new Genre("Reggae", [], [], []);
  let redemtion = new Song("Redemption Song", "Bob Marley", 1.20, [reggae], false, 1239128);
  let judge = new Song("Judge Not", "Bob Marley", 1.20, [reggae], false, 1239128);
  let playlist = new PlayList("Reggae Chill", [redemtion, judge], 140, [reggae]);
  
  it('It creates a new instance of an object with class PlayList', () => {
    expect(playlist).to.be.instanceOf(PlayList);
  });

  it('It has an attribute for its name', () => {
    expect(playlist.getName()).to.be.equal("Reggae Chill");
  });

  it('It has an attribute for its songs', () => {
    expect(playlist.getSongs()).to.be.eql([redemtion, judge]);
  });

  it('It has an attribute for its duration', () => {
    expect(playlist.getDuration()).to.be.equal(140);
  });

  it('It has an attribute for its genre', () => {
    expect(playlist.getGenres()).to.be.eql([reggae]);
  });

  it('There is a method to set the name', () => {
    playlist.setName("Prueba");
    expect(playlist.getName()).to.be.equal("Prueba");
  });

  it('There is a method to set the genres', () => {
    playlist.setGenres([reggae, pop]);
    expect(playlist.getGenres()).to.be.eql([reggae, pop]);
  });

  it('There is a method to add a song', () => {
    let hello = new Song("Hello", "", 120, [], true, 120);
    playlist.addSong(hello);
    expect(playlist.getSongs()).to.be.eql([redemtion, judge, hello]);
  });

  it('There is a method to remove a song', () => {
    playlist.removeSong("Hello");
    expect(playlist.getSongs()).to.be.eql([redemtion, judge]);
  });

  it('There is a method to remove a genre', () => {
    playlist.removeGenre(pop);
    expect(playlist.getGenres()).to.be.eql([reggae]);
  });

  it('There is a method to get the number of songs', () => {
    expect(playlist.getNumberOfSongs()).to.be.equal(2);
  });
});