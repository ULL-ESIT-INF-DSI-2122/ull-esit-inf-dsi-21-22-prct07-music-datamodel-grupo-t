import 'mocha';
import {expect} from 'chai';
import {Genre} from '../../src/models/genre'
import {Album} from '../../src/models/album'
import {Song} from '../../src/models/song';
import {DataAlbumManager} from '../../src/managers/dataAlbumManager'



describe('Album Manager class function tests', () => {
  let reggaeton = new Genre("Reggaeton");
  let travesuras = new Song("Travesuras","Nicky Jam",{minutes: 3, seconds: 17},[reggaeton],false,4522113);
  let amanecer = new Song("Hasta El Amanecer","Nicky Jam",{minutes: 3, seconds: 24},[reggaeton],false,12446941);
  let perdon =   new Song("El Perdón","Nicky Jam",{minutes: 4, seconds: 28},[reggaeton],false,1199631); 
  let album = new Album("Fénix","Nicky Jam",2007,[reggaeton],[travesuras,amanecer,perdon]);
  let albumManager = new DataAlbumManager([album]);

  it('It creates a new instance of an object with class DataAlbumManager', () => {
    expect(albumManager).to.be.instanceOf(DataAlbumManager);
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
    expect(albumManager.getAlbumsNames()).not.to.be.eql(null);
  });

  it('It can add a new album', () => {
    expect(albumManager.addNewAlbum(album)).to.be.oneOf([0,-1]);
  });

  it('It can delete an album', () => {
    expect(albumManager.deleteAlbum("Songs of Freedom")).not.to.be.eql(null);
  });
});