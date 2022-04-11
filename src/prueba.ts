import * as inquirer from 'inquirer';
import {DataGenreManager} from './managers/dataGenreManager';
import {DataArtistManager} from './managers/dataArtistManager';
import {DataAlbumManager} from './managers/dataAlbumManager';
import {DataGroupManager} from './managers/dataGroupManager';
import {DataSongManager} from './managers/dataSongManager';
import {Gestor} from './managers/gestor';
import {songs, groups, artists, albums, genres, playlists} from './data/defaultData';
import {Genre, GenreName} from './models/genre';


let dataGenreManager = new DataGenreManager(genres);
let dataArtistManager = new DataArtistManager(artists);
let dataAlbumManager = new DataAlbumManager(albums);
let dataGroupManager = new DataGroupManager(groups);
let dataSongManager = new DataSongManager(songs);
let playlistManager = new Gestor(playlists);


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
        console.log("Gestionar géneros")
        manageGenres();
        break;
      case 'Canciones':
        console.log("Gestionar temas")
        manageSongs();
        break;
      case 'Álbums':
        console.log("Gestionar albums")
        // manageAlbums();
        break;
      case 'Grupos':
        console.log("Gestionar grupos")
        // manageGroups();
        break;
      case 'Artistas':
        console.log("Gestionar artistas")
        // manageArtists();
        break;   
      case 'Salir':
        console.log('Saliendo del programa...')
        break;
    }
  });
  return 0;
}

export function manageGenres() {
  console.clear()    
  console.log('Gestor de géneros');
  let currentGenres = dataGenreManager.getGenreNames();
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
        console.log('Añadir un nuevo género');
        let addGenreQuestions = [
          {
            type: 'list',
            name: 'electionGenre',
            message: '¿Qué género desea añadir?',
            choices: [
              'Rap','Pop','Pop','Rock','Electro','Classic','Country','Heavy','Jazz',
              'Salsa','Flamenco','Folk','Country','Blues','Reggaeton','Punk','Reggae',
              'Soul','Gospel','Funk','Disco','Hip Hop'],
          }
        ];
        inquirer.prompt(addGenreQuestions).then((answers: any) => {
          dataGenreManager.addNewGenre(new Genre(answers.electionGenre));
          console.log(`Género ${answers.electionGenre} añadido`);
        });
        break;
      
      case 'Modificar':
        console.log('Modificar un género');
        // let genreElection = [
        //   {
        //     type: 'list',
        //     name: 'election',
        //     message: '¿Qué desea género desea administrar?',
        //     choices: currentGenres,
        //   }
        // ];
        // inquirer.prompt(genreElection).then((answers: any) => {
        //   let election = answers.election;
        //   modifyGenre(election);
        // });
        break;

      case 'Borrar':
        console.log('Eliminar un nuevo género');
        let deleteGenreQuestions = [
          {
            type: 'list',
            name: 'electionGenre',
            message: '¿Qué género desea eliminar?',
            choices: currentGenres,
          }
        ];
        inquirer.prompt(deleteGenreQuestions).then((answers: any) => {
          dataGenreManager.deleteGenre(answers.electionGenre);
          console.log(`Género ${answers.electionGenre} eliminado`);
        });
        break;
      
      case 'Atrás':
        break;
    }
  });
}


function modifyGenre(nameGenre: GenreName): void {
  const modifyGenreQuestions = [
    {
      type: 'list',
      name: 'election',
      message: '¿Qué desea hacer?',
      choices: [
        'Añadir canciones', 'Borrar canciones',
        'Añadir grupos', 'Borrar grupos',
        'Añadir artistas', 'Borrar artistas',
        'Añadir álbumes', 'Borrar álbumes'
        ],
    }
  ];

  inquirer.prompt(modifyGenreQuestions).then((answers: any) => {
    switch(answers['election']) {
      case 'Añadir canciones':
        let currentSongs = dataSongManager.getSongNames();
        let AddSongToGenreQuestions = [
          {
            type: 'list',
            name: 'electionSong',
            message: '¿Qué canción desea añadir al género?',
            choices: currentSongs,
          }
        ];
        inquirer.prompt(AddSongToGenreQuestions).then((answers: any) => {
          dataGenreManager.addSongToGenre(answers.electionSong, nameGenre);
          console.log(`Canción ${answers.electionSong} añadida al género ${nameGenre}`);
        });

        break;

      case 'Borrar canciones':
        let currentSongsOfGenre = dataGenreManager.getDefinedGenre(nameGenre)?.getSongCollection();
        let songNamesOfGenre: string[] = [];
        currentSongsOfGenre?.forEach((song) => {
          songNamesOfGenre.push(song.getName());
        });
        let DeleteSongOfGenreQuestions = [
          {
            type: 'list',
            name: 'electionSong',
            message: '¿Qué canción desea borrar del género?',
            choices: songNamesOfGenre,
          }
        ];
        inquirer.prompt(DeleteSongOfGenreQuestions).then((answers: any) => {
          dataGenreManager.deleteSongOfGenre(answers.electionSong, nameGenre);
          console.log(`Canción ${answers.electionSong} eliminada del género ${nameGenre}`);
        });
        break;

      case 'Añadir grupos':
        break;

      case 'Borrar grupos':
        break;
      
      case 'Añadir artistas':
        break;

      case 'Borrar artistas':
        break;

      case 'Añadir álbumes':
        break;

      case 'Borrar álbumes':
        break;
    }
  });
}

function manageSongs() {
  console.clear()    
  console.log('Gestor de temas');
  let currentSongs = dataSongManager.getSongNames();
  let currentGenres = dataGenreManager.getGenreNames();
  const questionsSongs = [
    {
      type: 'list',
      name: 'option',
      message: '¿Que desea hacer (añadir, borrar o modificar una canción)?',
      choices: ['Añadir', 'Modificar', 'Borrar', 'Atrás']
    }
  ];

  inquirer.prompt(questionsSongs).then((answers: any) => {
    switch(answers['option']) {
      case 'Añadir':
        console.log('Añadir un nuevo tema');
        let addSongQuestions = [
          {
            type: 'input',
            name: 'songName',
            message: '¿Cuál es el nombre de la canción?'
          },
          {
            type: 'input',
            name: 'artistName',
            message: '¿Cuál es el nombre del artista?'
          },
          {
            type: 'list',
            name: 'genreName',
            message: '¿A qué género pertenece?',
            choices: currentGenres
          },
          {
            type: 'input',
            name: 'duration',
            message: '¿Cuál es su duración (en segundos)?'
          },
          {
            type: 'list',
            name: 'isSingle',
            message: '¿Es un single?',
            choices: ['Si', 'No']
          },
          {
            type: 'input',
            name: 'viewers',
            message: '¿Cuántas visualizaciones tiene la canción?'
          }
        ];
        inquirer.prompt(questionsSongs).then((answers: any) => {
          dataGenreManager.addNewGenre(new Genre(answers.electionGenre));
          console.log(`Género ${answers.electionGenre} añadido`);
        });
        break;
      }
}

promptUser();