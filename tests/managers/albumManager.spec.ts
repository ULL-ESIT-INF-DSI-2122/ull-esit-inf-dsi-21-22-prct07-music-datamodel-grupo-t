import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/models/genre'
import {Album} from '../../src/models/album'
import {Song} from '../../src/models/song';
import {DataAlbumManager} from '../../src/managers/dataAlbumManager'



describe('Album Manager class function tests', () => {
  let reggae = new Genre("Reggae", [], [], []);
  let redemtion = new Song("Redemption Song", "Bob Marley", {minutes: 1, seconds: 34}, [reggae], false, 1239128);
  let judge = new Song("Judge Not", "Bob Marley", {minutes: 1, seconds: 34}, [reggae], false, 1239128);
  let album = new Album("Songs of Freedom", "Bob Marley", 1961, [reggae], [redemtion, judge]);
  let albumManager = new DataAlbumManager([album]);

  it('It creates a new instance of an object with class DataAlbumManager', () => {
    expect(albumManager).to.be.instanceOf(DataAlbumManager);
  });

  it('It can write the data in the Database', () => {
    expect(albumManager.writeData([album])).not.to.equal(null);
  });

  it('It can read the data from the Database', () => {
    expect(albumManager.readData()).not.to.equal(null);
  });

  it('It can get the albums', () => {
    expect(albumManager.getAlbums()).not.to.be.eql(null);
  });

  it('It can get a definded album', () => {
    expect(albumManager.getDefinedAlbum("Songs of Freedom")).not.to.be.eql(null);
  });

  it('It can get an album name', () => {
    expect(albumManager.getAlbumsNames()).to.be.eql(["Songs of Freedom"]);
  });

  it('It can add a new album', () => {
    expect(albumManager.addNewAlbum(album)).to.be.eql(-1);
  });

  it('It can delete an album', () => {
    expect(albumManager.deleteAlbum("Songs of Freedom")).not.to.be.eql(null);
  });
});