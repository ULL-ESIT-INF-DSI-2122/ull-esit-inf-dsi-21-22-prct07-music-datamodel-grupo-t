import 'mocha';
import {expect} from 'chai';
import {Genre} from '../src/models/genre'
import {Album} from '../src/models/album'
import {Song} from '../src/models/song';
import {Artist} from '../src/models/artist';
import {Group} from '../src/models/group';

let song = new Song("Song", "Paul", {minutes: 1, seconds: 34}, [], false, 12);
let album = new Album("", "Paul", 2000, [], [song]);
let pop = new Genre("Pop", [], [], []);
let imagine = new Group("", [], 0, [], [], 120);
let fallout = new Group("", [], 0, [], [], 120);
let artist = new Artist("Paul", [fallout, imagine], [pop], [album], [song]);
const genre = new Genre('Hip Hop', [imagine, artist, fallout], [album], [song]);

describe('Pruebas de la clase Genre', () => {  
  it('Es una instancia de la clase Genre', () => {
    expect(genre).to.be.instanceOf(Genre);
  });

  it('Todos los getters funcionan correctamente', () => {
    expect(genre.getName()).to.be.eq('Hip Hop');
    expect(genre.getArtist(imagine)).to.be.eql(imagine);
    expect(genre.getArtistCollection()).to.be.eql([imagine, artist, fallout]);
    expect(genre.getAlbum(album)).to.be.eql(album);
    expect(genre.getAlbumCollection()).to.be.eql([album]);
    expect(genre.getSong(song)).to.be.eql(song);
    expect(genre.getSongCollection()).to.be.eql([song]);
  });

  it('Todos los setters funcionan correctamente', () => {
    expect(genre.setArtists([imagine])).to.be.undefined;
    expect(genre.setName('Blues')).to.be.undefined;
    expect(genre.setAlbums([album])).to.be.undefined;
    expect(genre.setSongs([song, song])).to.be.undefined;
  });

  it('Añade datos correctamente', () => {
    expect(genre.addArtists(artist)).to.be.undefined;
    expect(genre.addAlbum(album)).to.be.undefined;
    expect(genre.addSong(song)).to.be.undefined;
  });

  it('Elimina datos correctamente', () => {
    expect(genre.deleteArtists(artist)).to.be.undefined;
    expect(genre.deleteAlbum(album)).to.be.undefined;
    expect(genre.deleteSong(song)).to.be.undefined;
  });
});