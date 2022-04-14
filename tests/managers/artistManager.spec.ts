 import 'mocha';
 import {expect} from 'chai';
 import {Genre} from '../../src/models/genre'
 import {Album} from '../../src/models/album'
 import {Song} from '../../src/models/song';
 import {Artist} from '../../src/models/artist';
 import {Group} from '../../src/models/group';
 import {DataArtistManager} from '../../src/managers/dataArtistManager';

 describe('Artist Manager class function tests', () => {
     let song = new Song("Song", "Paul", {minutes: 1, seconds: 34}, [], false, 12);
     let album = new Album("", "Paul", 2000, [], [song]);
     let pop = new Genre("Pop", [], [], []);
     let imagine = new Group("", [], 0, [], [], 120);
     let fallout = new Group("", [], 0, [], [], 120);
     let artist = new Artist("Paul", [fallout, imagine], [pop], [album], [song]);
     let artistManager = new DataArtistManager([artist]);
    
     it('It creates a new instance of an object with class DataArtistManager', () => {
       expect(artistManager).to.be.instanceOf(DataArtistManager);
     });
    
     it('It can get the artist', () => {
         expect(artistManager.getArtists()).not.to.be.eql(null);
     });
    
       it('It can get a definded artist', () => {
         expect(artistManager.getDefinedArtist("Paul")).not.to.be.eql(null);
       });
    
       it('It can get an artist name', () => {
         expect(artistManager.getArtistNames()).not.to.be.eql(null);
       });
    
       it('It can add a new artist', () => {
         expect(artistManager.addNewArtist(artist)).to.be.eql(0);
       });
    
       it('It can delete an album', () => {
         expect(artistManager.deleteArtist("Paul")).not.to.be.eql(null);
       });
   });