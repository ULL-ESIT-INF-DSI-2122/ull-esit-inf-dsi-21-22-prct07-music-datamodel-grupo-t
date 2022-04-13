import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/models/genre'
import {Album} from '../../src/models/album'
import {Song} from '../../src/models/song';
import {DataGenreManager} from '../../src/managers/dataGenreManager'



describe('DataGenreManager Manager class function tests', () => {
  let reggae = new Genre("Reggae", [], [], []);
  let redemtion = new Song("Redemption Song", "Bob Marley", {minutes: 1, seconds: 34}, [reggae], false, 1239128);
  let judge = new Song("Judge Not", "Bob Marley", {minutes: 1, seconds: 34}, [reggae], false, 1239128);
  let album = new Album("Songs of Freedom", "Bob Marley", 1961, [reggae], [redemtion, judge]);
  let genreManager = new DataGenreManager([reggae]);

  it('It creates a new instance of an object with class DataGenreManager', () => {
    expect(genreManager).to.be.instanceOf(DataGenreManager);
  });

  it('It can write the data in the Database', () => {
    expect(genreManager.writeData([reggae])).not.to.equal(null);
  });

  it('It can read the data from the Database', () => {
    expect(genreManager.readData()).not.to.equal(null);
  });

  it('It can get the genres', () => {
    expect(genreManager.getGenres()).not.to.be.eql(null);
  });

  it('It can get a definded genre', () => {
    expect(genreManager.getDefinedGenre("Reggae")).not.to.be.eql(null);
  });

  it('It can get a genre name', () => {
    expect(genreManager.getGenreNames()).to.be.eql(["Reggae"]);
  });

  it('It can add a new genre', () => {
    expect(genreManager.addNewGenre(reggae)).to.be.eql(-1);
  });

  it('It can delete a genre', () => {
    expect(genreManager.deleteGenre("Reggae")).not.to.be.eql(null);
  });
});