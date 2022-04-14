import 'mocha';
import {expect} from 'chai';
import {PlayList} from '../../src/models/playlist'
import {Genre} from '../../src/models/genre'
import {Song} from '../../src/models/song';
import {Gestor} from '../../src/managers/gestor'


describe('PlayList class function tests', () => {
  let pop = new Genre("Pop", [], [], []);
  let reggae = new Genre("Reggae", [], [], []);
  let redemtion = new Song("Redemption Song", "Bob Marley", {minutes: 1, seconds: 40}, [reggae], false, 1239128);
  let judge = new Song("Judge Not", "Bob Marley", {minutes: 1, seconds: 50}, [reggae], false, 1239128);
  let playlist = new PlayList("Reggae Chill", [redemtion,judge], {minutes: 3, seconds: 30}, [reggae,pop]);
  let gestor = new Gestor([playlist]);
  
  it('It creates a new instance of an object with class Gestor', () => {
    expect(gestor).to.be.instanceOf(Gestor);
  });
  it('There is a method to show the PlayLists information', () => {
    expect(gestor.showPlaylists()).not.to.be.eql(null);
  });
});