import 'mocha';
import { expect } from 'chai';
import { Song } from '../../src/models/song'
import { Genre } from '../../src/models/genre';
import {DataSongManager} from '../../src/managers/dataSongManager'



describe('Song Manager class function tests', () => {

    let pop = new Genre('Pop', [], [], []);
    let song = new Song('Danza Kuduro', 'Don Omar', {minutes: 1, seconds: 34}, [pop], true, 1000000);
    let songManager = new DataSongManager([song]);

  it('It creates a new instance of an object with class DataSongManager', () => {
    expect(songManager).to.be.instanceOf(DataSongManager);
  });

  it('It can write the data in the Database', () => {
    expect(songManager.writeData([song])).not.to.equal(null);
  });

  it('It can read the data from the Database', () => {
    expect(songManager.readData()).not.to.equal(null);
  });

  it('It can get the songs', () => {
    expect(songManager.getSongs()).not.to.be.eql(null);
  });

  it('It can get a definded song', () => {
    expect(songManager.getDefinedSong("Danza Kuduro")).not.to.be.eql(null);
  });

  it('It can get a song name', () => {
    expect(songManager.getSongNames()).to.be.eql(["Danza Kuduro"]);
  });

  it('It can add a new song', () => {
    expect(songManager.addNewSong(song)).to.be.eql(-1);
  });

  it('It can delete a song', () => {
    expect(songManager.deleteSong("Danza Kuduro")).not.to.be.eql(null);
  });
});