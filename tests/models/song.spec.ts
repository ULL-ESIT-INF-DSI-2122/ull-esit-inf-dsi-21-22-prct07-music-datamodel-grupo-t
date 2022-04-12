import 'mocha';
import { expect } from 'chai';
import { Song } from '../../src/models/song'
import { Genre } from '../../src/models/genre';

const pop = new Genre('Pop', [], [], []);
const song = new Song('Danza Kuduro', 'Don Omar', {minutes: 1, seconds: 34}, [pop], true, 1000000);

describe('Pruebas de la clase Song', () => {  
  it('Es una instancia de la clase Song', () => {
    expect(song).to.be.instanceOf(Song);
  });

  it('Todos los getters funcionan correctamente', () => {
    expect(song.getName()).to.be.eq('Danza Kuduro');
    expect(song.getAuthor()).to.be.eq('Don Omar');
    expect(song.getDuration()).to.be.eql({minutes: 1, seconds: 34});
    expect(song.getGenres()).to.be.eql([pop]);
    expect(song.getIsSingle()).to.be.eq(true);
    expect(song.getViews()).to.be.eq(1000000);
  });

  it('Todos los setters funcionan correctamente', () => {
    expect(song.setAuthor('Daddy Yankee')).to.be.undefined;
    expect(song.setName('Gasolina')).to.be.undefined;
    expect(song.setDuration({minutes: 4, seconds: 54})).to.be.undefined;
    expect(song.setGenres([pop])).to.be.undefined;
    expect(song.setIsSingle(true)).to.be.undefined;
    expect(song.setViews(95000)).to.be.undefined;
  });

});
