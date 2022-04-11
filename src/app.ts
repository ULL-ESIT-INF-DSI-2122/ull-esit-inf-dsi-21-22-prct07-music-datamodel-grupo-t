import * as inquirer from 'inquirer';
import {DataGenreManager} from './managers/dataGenreManager';
import {DataArtistManager} from './managers/dataArtistManager';
import {DataAlbumManager} from './managers/dataAlbumManager';
import {DataGroupManager} from './managers/dataGroupManager';
import {DataSongManager} from './managers/dataSongManager';
import {Gestor} from './managers/gestor';
import {songs, groups, artists, albums, genres, playlists} from './data/defaultData';
import {Genre} from './models/genre';
import {Song} from './models/song';
import {Artist} from './models/artist';


const dataGenreManager = new DataGenreManager(genres);
const dataArtistManager = new DataArtistManager(artists);
const dataAlbumManager = new DataAlbumManager(albums);
const dataGroupManager = new DataGroupManager(groups);
const dataSongManager = new DataSongManager(songs);
const playlistManager = new Gestor(playlists);

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

  inquirer.prompt(questions).then((answers) => {    
    switch(answers['election']) {
      case 'Géneros':
        console.log("Gestionar géneros")
        modifyGenrePrompt();
        break;
      case 'Canciones':
        console.log("Gestionar temas")
        modifySongPrompt();
        break;
      case 'Álbums':
        console.log("Gestionar albums")
        modifyAlbumPrompt();
        break;
      case 'Grupos':
        console.log("Gestionar grupos")
        modifyGroupsPrompt()
        break;
      case 'Artistas':
        console.log("Gestionar artistas")
        modifyArtistasPrompt();
        break;   
      case 'Salir':
        console.log('Saliendo del programa...')
        break;
      }
    });
  return 0;
}

function modifyGenrePrompt(): void {
  console.clear()    
  console.log('Gestor de géneros');
  const currentGenres = dataGenreManager.getGenreNames();
  const question = [
    {
      type: 'list',
      name: 'election',
      message: '¿Que desea hacer (añadir, borrar o modificar un género)?',
      choices: ['Añadir'/* , 'Modificar' */, 'Borrar', 'Atrás']
    }
  ];

  inquirer.prompt(question).then((answers) => {
    switch(answers['election']) {
      case 'Añadir':
        console.log('Añadir un nuevo género');
        const question = [
        {
          type: 'list',
          name: 'electionGenre',
          message: '¿Qué género desea añadir?',
          choices: [
            'Rap','Pop','Popular','Rock','Electro','Classic','Country','Heavy','Jazz',
            'Salsa','Flamenco','Folk','Country','Blues','Reggaeton','Punk','Reggae',
            'Soul','Gospel','Funk','Disco','Hip Hop'],
        }
        ];
        inquirer.prompt(question).then((answers) => {
          const added = dataGenreManager.addNewGenre(new Genre(answers.electionGenre));
          if (added === 0) {
            console.log(`Género ${answers.electionGenre} añadido`);
          } else {
            console.log('Error, ese género ya está definido.');
          }
          inquirer.prompt([{
            name: 'continue',
            message: 'Pulse enter para continuar',
            type: 'input'
          }]).then(function() {
            promptUser();
          });
        });
        break;

      case 'Borrar':
        console.log('Eliminar un género');
        const questions = [
        {
          type: 'list',
          name: 'election',
          message: '¿Qué canción desea eliminar?',
          choices: currentGenres,
        }
        ];
        inquirer.prompt(questions).then((answers) => {
          dataGenreManager.deleteGenre(answers.election);
          console.log(`Género ${answers.election} eliminado`);
          inquirer.prompt([{
            name: 'continue',
            message: 'Pulse enter para continuar',
            type: 'input'
          }]).then(function() {
            promptUser();
          });
        });
        break;
      
      case 'Atrás':
        promptUser();
        break;
    }
  });
}


function modifySongPrompt(): void {
  console.clear();
  console.log('Gestor de Canciones');
  const currentGenres = dataGenreManager.getGenreNames();
  const currentSongs = dataSongManager.getSongNames();
  const question = [
    {
      type: 'list',
      name: 'election',
      message: '¿Que desea hacer (añadir, borrar o modificar una canción)?',
      choices: ['Añadir'/* , 'Modificar' */, 'Borrar', 'Atrás']
    }
  ];

  inquirer.prompt(question).then((answers) => {
    switch(answers['election']) {
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
        inquirer.prompt(addSongQuestions).then((answers) => {
          const added = dataSongManager.addNewSong(
            new Song(answers.songName, answers.artistName, answers.duration,
              [new Genre(answers.genreName)], answers.isSingle, answers.viewers));
          if (added === 0) {
            console.log(`Género ${answers.electionGenre} añadido`);    
          } else {
            console.log('Error, ya existe una canción con ese nombre y artista.');
          }
          inquirer.prompt([{
            name: 'continue',
            message: 'Pulse enter para continuar',
            type: 'input'
          }]).then(function() {
            promptUser();
          });
        });
        break;
      
      // case 'Modificar':
      //   console.log('Modificar un género');
      //   const genreElection = [
      //     {
      //       type: 'list',
      //       name: 'election',
      //       message: '¿Qué desea género desea administrar?',
      //       choices: currentGenres,
      //     }
      //   ];
      //   inquirer.prompt(genreElection).then((answers: any) => {
      //     const election = answers.election;
      //     // dataGenreManager.modifyGenre(election);
      //   });
      //   break;

      case 'Borrar':
        console.log('Eliminar una canción');
        let question = [
          {
            type: 'list',
            name: 'election',
            message: '¿Qué canción desea eliminar?',
            choices: currentSongs,
          }
        ];
        inquirer.prompt(question).then((answers) => {
          dataSongManager.deleteSong(answers.election);
          console.log(`Canción ${answers.election} eliminada`);
        });
        inquirer.prompt([{
          name: 'continue',
          message: 'Pulse enter para continuar',
          type: 'input'
        }]).then(function() {
          promptUser();
        });
        break;
      
      case 'Atrás':
        promptUser();
        break;
    }
  });
}

function modifyAlbumPrompt(): void {
  console.clear()    
  console.log('Gestor de Albumes');
  const currentAlbums = dataAlbumManager.getAlbumsNames();
  const question = [
    {
      type: 'list',
      name: 'election',
      message: '¿Que desea hacer (añadir, borrar o modificar un album)?',
      choices: ['Añadir'/* , 'Modificar' */, 'Borrar', 'Atrás']
    }
  ];

  inquirer.prompt(question).then((answers) => {
    switch(answers['election']) {
      case 'Añadir':
        // console.log('Añadir una nueva canción');
        // const addSongQuestions = [
        //   {
        //     type: 'list',
        //     name: 'electionSong',
        //     message: '¿Qué canción desea añadir?',
        //     choices: [
        //       'Rap','Pop','Pop','Rock','Electro','Classic','Country','Heavy','Jazz',
        //       'Salsa','Flamenco','Folk','Country','Blues','Reggaeton','Punk','Reggae',
        //       'Soul','Gospel','Funk','Disco','Hip Hop'],
        //   }
        // ];
        // inquirer.prompt(addSongQuestions).then((answers) => {
        //   dataGenreManager.addNewGenre(new Genre(answers.electionSong));
        //   console.log(`Género ${answers.electionSong} añadido`);
        // });
        // dataAlbumManager.addAlbum();
        break;
      
      // case 'Modificar':
      //   console.log('Modificar un género');
      //   const genreElection = [
      //     {
      //       type: 'list',
      //       name: 'election',
      //       message: '¿Qué desea género desea administrar?',
      //       choices: currentGenres,
      //     }
      //   ];
      //   inquirer.prompt(genreElection).then((answers: any) => {
      //     const election = answers.election;
      //     // dataGenreManager.modifyGenre(election);
      //   });
      //   break;

      case 'Eliminar':
        console.log('Eliminar un album');
        const questions = [
          {
            type: 'list',
            name: 'election',
            message: '¿Qué álbum desea eliminar?',
            choices: currentAlbums,
          }
        ];
        inquirer.prompt(questions).then((answers) => {
          // dataAlbumManager.deleteAlbum(answers.election);
          console.log(`Álbum ${answers.election} eliminado`);
        });
        break;
      
      case 'Atrás':
        promptUser();
        break;
    }
  }); 
}

function modifyGroupsPrompt(): void {
  console.clear()    
  console.log('Gestor de Grupos');
  const currentGroups = dataGroupManager.getGroupNames();
  const question = [
    {
      type: 'list',
      name: 'election',
      message: '¿Que desea hacer (añadir, borrar o modificar un grupo)?',
      choices: ['Añadir'/* , 'Modificar' */, 'Borrar', 'Atrás']
    }
  ];

  inquirer.prompt(question).then((answers) => {
    switch(answers['election']) {
      case 'Añadir':
        // console.log('Añadir una nueva canción');
        // const addSongQuestions = [
        //   {
        //     type: 'list',
        //     name: 'electionSong',
        //     message: '¿Qué canción desea añadir?',
        //     choices: [
        //       'Rap','Pop','Pop','Rock','Electro','Classic','Country','Heavy','Jazz',
        //       'Salsa','Flamenco','Folk','Country','Blues','Reggaeton','Punk','Reggae',
        //       'Soul','Gospel','Funk','Disco','Hip Hop'],
        //   }
        // ];
        // inquirer.prompt(addSongQuestions).then((answers) => {
        //   dataGenreManager.addNewGenre(new Genre(answers.electionSong));
        //   console.log(`Género ${answers.electionSong} añadido`);
        // });
        // dataAlbumManager.addAlbum();
        break;
      
      // case 'Modificar':
      //   console.log('Modificar un género');
      //   const genreElection = [
      //     {
      //       type: 'list',
      //       name: 'election',
      //       message: '¿Qué desea género desea administrar?',
      //       choices: currentGenres,
      //     }
      //   ];
      //   inquirer.prompt(genreElection).then((answers: any) => {
      //     const election = answers.election;
      //     // dataGenreManager.modifyGenre(election);
      //   });
      //   break;

      case 'Eliminar':
        console.log('Eliminar un grupo');
        const questions = [
          {
            type: 'list',
            name: 'election',
            message: '¿Qué grupo desea eliminar?',
            choices: currentGroups,
          }
        ];
        inquirer.prompt(questions).then((answers) => {
          // dataGroupManager.deleteGroup(answers.election);
          console.log(`Grupo ${answers.electionSong} eliminado`);
        });
        break;
      
      case 'Atrás':
        promptUser();
        break;
    }
  }); 
}

function modifyArtistasPrompt(): void {
  console.clear()    
  console.log('Gestor de Artistas');
  const currentArtist = dataArtistManager.getArtistNames();
  const currentGenres = dataGenreManager.getGenreNames();
  const currentGroups = dataGroupManager.getGroupNames();
  const currentAlbums = dataAlbumManager.getAlbumsNames();
  const currentSongs = dataSongManager.getSongNames();

  const question = [
    {
      type: 'list',
      name: 'election',
      message: '¿Que desea hacer (añadir, borrar o modificar un artista)?',
      choices: ['Añadir'/* , 'Modificar' */, 'Borrar', 'Atrás']
    }
  ];

  inquirer.prompt(question).then((answers) => {
    switch(answers['election']) {
      case 'Añadir':
      console.log('Añadir un nuevo artista');
      let question = [
        {
          type: 'input',
          name: 'artistName',
          message: '¿Cuál es el nombre del artista?'
        },
        {
          type: 'list',
          name: 'groups',
          message: '¿A que grupo pertenece?',
          choices: currentGroups + 'ninguno'
        },
        {
          type: 'checkbox',
          name: 'albumns',
          message: '¿Qué albumes tiene?',
          choices: currentAlbums + 'ninguno'
        },
        {
          type: 'checkbox',
          name: 'genres',
          message: '¿A qué géneros pertenece?',
          choices: currentGenres
        },
        {
          type: 'checkbox',
          name: 'songs',
          message: '¿Qué canciones son suyas?',
          choices: currentSongs
        },
      ];
      
      inquirer.prompt(question).then((answers) => {
        const added = dataArtistManager.addNewArtist(new Artist(answers.artistName, answers.groups, 
          answers.genres, answers.albums, answers.songs));
          if (added === 0) {
            console.log(`Género ${answers.electionGenre} añadido`);
          } else {
            console.log('Error, ese género ya está definido.');
          } 
      });
      break;

    case 'Eliminar':
      console.log('Eliminar un artista');
      const questions = [
        {
          type: 'list',
          name: 'election',
          message: '¿Qué artista desea eliminar?',
          choices: currentArtist,
        }
      ];
      inquirer.prompt(questions).then((answers) => {
        dataArtistManager.deleteArtist(answers.election);
        console.log(`Artista ${answers.election} eliminado`);
      });
      break;

    case 'Atrás':
      promptUser();
      break;
    }
  });
}

promptUser();
