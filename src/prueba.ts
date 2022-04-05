/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */
 import {Album} from './album';
 import {Genre} from './genre';
 import {Song} from './song';
 import {Artist} from './artist';
 import {Group} from './group';

 let song = new Song("Song", "Paul", {minutes: 1, seconds: 34}, [], false, 12);
 let album = new Album("", "Paul", 2000, [], [song]);
 let pop = new Genre("Pop", [], [], []);
 let artist1 = new Artist("Paul", [], [pop], [album], [song]);
 let artist2 = new Artist("Zero", [], [pop], [album], [song]);
 let imagine = new Group("Imagine", [artist1, artist2], 2000, [pop], [album], 120);

export function commandline() {
    'use strict';
    const inquirer = require('inquirer');
    
    console.log('Bienvenido a la biblioteca musical');
    
    const questions = [
    {
        type: 'list',
        name: 'election',
        message: '¿Que desea gestionar (añadir, borrar y/o modificar)?',
        choices: ['Géneros', 'Canciones', 'Álbums', 'Grupos', 'Artistas'],
    },
    ];
    
    inquirer.prompt(questions).then((answers: any) => {
    switch(answers['election']) {
        case 'Géneros':
            console.log("Gestiona Géneros")
            gestionarGeneros();
            break;
        case 'Canciones':
            console.log("Gestiona temas")
            break;
        case 'Álbums':
            console.log("Gestiona albums")
            break;
        case 'Grupos':
            console.log("Gestiona grupos")
            break;
        case 'Artistas':
            console.log("Gestiona artistas")
            break;           
    }
    });
}

export function gestionarGeneros() {
    'use strict';
    const inquirer = require('inquirer');
    
    console.log('Bienvenido al gestor de generos');
    
    const questionsGenre = [
    {
        type: 'list',
        name: 'electionGenre',
        message: '¿Que desea hacer (añadir, borrar o modificar una canción)?',
        choices: ['Añadir', 'Modificar', 'Borrar'],
    },
    ];
    inquirer.prompt(questionsGenre).then((answers: any) => {
        switch(answers['electionGenre']) {
            case 'Añadir':
                const questionsGenreName = [
                    {
                        type: 'list',
                        name: 'electionGenreName',
                        message: 'Elija el Género',
                        choices: ['Rap','Pop','Pop','Rock','Electro','Classic','Country','Heavy','Jazz',
                        'Salsa','Flamenco','Folk','Country','Blues','Reggaeton','Punk','Reggae','Soul','Gospel','Funk','Disco','Hip Hop'],
                    },
                    {
                        type: 'input',
                        name: 'electionGenreArtist',
                        message: 'Añada un artista del género',
                    },
                    {
                        type: 'input',
                        name: 'electionGenreAlbum',
                        message: 'Añada un album del género',
                    },
                    {
                        type: 'input',
                        name: 'electionGenreCancion',
                        message: 'Añada una canción del género',
                    },
                    ];
                    inquirer.prompt(questionsGenreName).then((answers: any) => {
                        const genre = new Genre(answers['electionGenreName'], [answers['electionGenreArtist']], [answers['electionGenreAlbum']], [answers['electionGenreCancion']]);
                        console.log(`El género es ${genre.getName()}`)
                        console.log(`El artista es ${genre.getArtistCollection()}`)
                        console.log(`El album es ${genre.getAlbumCollection()}`)
                        console.log(`El cancion es ${genre.getSongCollection()}`)
                    });
                break;
        }
    });
}
commandline()
