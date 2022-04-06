import * as inquirer from 'inquirer';
import {Album} from './models/album';
import {Genre, GenreName} from './models/genre';
import {Song} from './models/song';
import {Artist} from './models/artist';
import {Group} from './models/group';
import {JsonDataMusicCollection} from './jsonDataMusicCollection';
import {songs, groups, artists, albums, genres, playlists} from './data';

let jsonDataMusicCollection = new JsonDataMusicCollection(genres, artists, albums, groups, songs, playlists);

export function promptUser() {
  console.clear();
  console.log('Bienvenido a la biblioteca musical');
  
  const questions = [
    {
        type: 'list',
        name: 'election',
        message: '¿Que desea hacer (añadir, borrar y/o modificar)?',
        choices: ['Géneros', 'Canciones', 'Álbums', 'Grupos', 'Artistas', 'Salir'],
    },
  ];

  inquirer.prompt(questions).then((answers: any) => {
    switch(answers['election']) {
      case 'Géneros':
        console.log("Gestionar Géneros")
        manageGenres();
        break;
      case 'Canciones':
        console.log("Gestionar temas")
        // método para el manejo de canciones
        break;
      case 'Álbums':
        console.log("Gestionar albums")
        // método para el manejo de álbumes
        break;
      case 'Grupos':
        console.log("Gestionar grupos")
        // método para el manejo de grupos
        break;
      case 'Artistas':
        console.log("Gestionar artistas")
        // método para el manejo de artistas
        break;   
      case 'Salir':
        console.log('Saliendo del programa...')
        break;
    }
  });
}

export function manageGenres() {
  console.clear()    
  console.log('Gestor de géneros');
  
  const questionsGenre = [
    {
      type: 'list',
      name: 'option',
      message: '¿Que desea hacer (añadir, borrar o modificar un género)?',
      choices: ['Añadir', 'Modificar', 'Borrar', 'Atrás']
    }
  ];

  inquirer.prompt(questionsGenre).then((answers: any) => {
    switch(answers['option']) {
      case 'Añadir':
        addNewGenre();
        break;
      
      case 'Modificar':
        // const genreList = [
        //   {
        //       type: 'list',
        //       name: 'electionGenre',
        //       message: '¿Qué género desea modificar?',
        //       choices: ['Añadir', 'Modificar', 'Borrar'],
        //   },
        // ];
        // Opciones para modificar el género
        // modifyGenre();
        break;

      case 'Eliminar':
        // deleteGenre();
        break;
      
      case 'Atrás':
        break;
    }
  });
}


function addNewGenre(): void {
  console.clear();
  console.log('Añadir un nuevo género');
    const addGenreQuestions = [
      {
        type: 'list',
        name: 'electionGenre',
        message: '¿Qué género desea añadir?',
        choices: [
          'Rap','Pop','Pop','Rock','Electro','Classic','Country','Heavy','Jazz',
          'Salsa','Flamenco','Folk','Country','Blues','Reggaeton','Punk','Reggae',
          'Soul','Gospel','Funk','Disco','Hip Hop'],
      },
      {
        type: 'confirm',
        name: 'modifyGenre',
        message: '¿Desea añadir canciones, artistas o álbumes al género?',
        default: false,
      }
    ];

    inquirer.prompt(addGenreQuestions).then((answers: any) => {
      // Añadir género
      const genre = new Genre(answers['electionGenre'], [], [], []);
      console.log(`Género ${genre.getName()} añadido con éxito`);
      if (answers['modifyGenre']) {
        modifyGenre(genre);
      }
    });
}


function modifyGenre(genre: Genre): void {
  const modifyGenreQuestions = [
    {
      type: 'list',
      name: 'election',
      message: '¿Qué desea hacer?',
      choices: [
        'Añadir Canciones', 'Borrar Canciones',
        'Añadir Grupos', 'Borrar Grupos',
        'Añadir Artistas', 'Borrar Artistas',
        'Añadir Álbumes', 'Borrar Álbumes'
        ],
    }
  ];

  inquirer.prompt(modifyGenreQuestions).then((answers: any) => {
    switch(answers['modifyGenreQuestions']) {
      case 'Añadir Canciones':
        const addSongToGenre = [{
          type: 'input',
          name: 'songName',
          message: 'Añada una canción al género: ',
        }];

        inquirer.prompt(addSongToGenre).then((answers: any) => {
          const newSong = new Song(answers['songName'], '', {minutes: 0, seconds: 0}, [], false, 0);
          genre.addSong(newSong);
          console.log(`Se ha añadido la canción ${newSong.getName()} al género ${genre.getName()}`)
        });
        break;

      case 'Borrar Canciones':
        break;

      case 'Añadir Grupos':
        break;

      case 'Borrar Grupos':
        break;
      
      case 'Añadir Artistas':
        break;

      case 'Borrar Artistas':
        break;

      case 'Añadir Álbumes':
        break;

      case 'Borrar Álbumes':
        break;
    }
  });
}

promptUser()


