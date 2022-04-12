import * as inquirer from 'inquirer';
import {DataGenreManager} from './managers/dataGenreManager';
import {DataArtistManager} from './managers/dataArtistManager';
import {DataAlbumManager} from './managers/dataAlbumManager';
import {DataGroupManager} from './managers/dataGroupManager';
import {DataSongManager} from './managers/dataSongManager';
import {Gestor} from './managers/gestor';
import {songs, groups, artists, albums, genres, playlists} from './data/defaultData';
import {Genre, GenreName} from './models/genre';
import {Song} from './models/song';
import {Album} from './models/album';
import {Artist} from './models/artist';
import {Group} from './models/group';
import { PlayList } from './models/playlist';


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
        choices: ['Géneros', 'Canciones', 'Álbums', 'Grupos', 'Artistas', 'PlayLists', 'Salir'],
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
        modifyArtistsPrompt();
        break;   
      case 'PlayLists':
        console.log("Gestionar playlists")
        modifyPlayListsPrompt();
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
            type: 'checkbox',
            name: 'genres',
            message: '¿A qué género(s) pertenece?',
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
            name: 'listeners',
            message: '¿Cuántas visualizaciones tiene la canción?'
          }
        ];
        inquirer.prompt(addSongQuestions).then((answers) => {
          const duration = {minutes: Math.floor(answers.duration / 60), seconds: answers.duration % 60};
          const genreNames = answers.genres as GenreName[];
          let genres: Genre[] = [];
          genreNames.forEach((genreName) => {
            genres.push(dataGenreManager.getDefinedGenre(genreName) as Genre);
          });
          const added = dataSongManager.addNewSong(
            new Song(answers.songName, answers.artistName, duration,
              genres, answers.isSingle, answers.listeners as number));
          if (added === 0) {
            console.log(`Canción ${answers.songName} añadida`);    
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

function modifyAlbumPrompt(): void {
  console.clear()    
  console.log('Gestor de Albumes');
  const currentAlbums = dataAlbumManager.getAlbumsNames();
  const currentGenres = dataGenreManager.getGenreNames();
  const currentSongs = dataSongManager.getSongNames();
  const currentArtist = dataArtistManager.getArtistNames();
  const currentGroups = dataGroupManager.getGroupNames();
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
        console.log('Añadir un nuevo álbum');
        let addAlbumQuestions = [
          {
            type: 'input',
            name: 'albumName',
            message: '¿Cuál es el nombre del álbum?'
          },
          {
            type: 'list',
            name: 'artistName',
            message: '¿A qué artista/grupo pertenece el álbum?',
            choices: currentGroups.concat(currentArtist)
          },
          {
            type: 'input',
            name: 'year',
            message: '¿En qué año se publico el álbum?',
          },
          {
            type: 'checkbox',
            name: 'genres',
            message: '¿A qué géneros pertenece el álbum?',
            choices: currentGenres
          },
          {
            type: 'checkbox',
            name: 'songs',
            message: '¿Qué canciones hay en el álbum?',
            choices: currentSongs
          }
        ];
        inquirer.prompt(addAlbumQuestions).then((answers) => {
          const genreNames = answers.genres as GenreName[];
          let genres: Genre[] = [];
          genreNames.forEach((genreName) => {
            genres.push(dataGenreManager.getDefinedGenre(genreName) as Genre);
          });
          const songNames = answers.songs as string[];
          let songs: Song[] = [];
          songNames.forEach((songName) => {
            songs.push(dataSongManager.getDefinedSong(songName) as Song);
          });
          const added = dataAlbumManager.addNewAlbum(
            new Album(answers.albumName, answers.artistName, answers.year as number, genres, songs));
          if (added === 0) {
            console.log(`Álbum ${answers.albumName} añadido`);    
          } else {
            console.log('Error, ya existe un álbum con ese nombre y artista/grupo.');
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
          dataAlbumManager.deleteAlbum(answers.election);
          console.log(`Álbum ${answers.election} eliminado`);
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

function modifyGroupsPrompt(): void {
  console.clear()    
  console.log('Gestor de Grupos');
  const currentArtist = dataArtistManager.getArtistNames();
  const currentGenres = dataGenreManager.getGenreNames();
  const currentGroups = dataGroupManager.getGroupNames();
  const currentAlbums = dataAlbumManager.getAlbumsNames();

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
        console.log('Añadir un nuevo grupo');
        const question = [
          {
            type: 'input',
            name: 'name',
            message: '¿Cuál es el nombre del grupo?'
          },
          {
            type: 'checkbox',
            name: 'artists',
            message: '¿Cuales son sus miembros?',
            choices: currentArtist
          },
          {
            type: 'input',
            name: 'year',
            message: '¿En qué año se formó?',
          },
          {
            type: 'checkbox',
            name: 'genres',
            message: '¿A qué géneros pertenece?',
            choices: currentGenres
          },
          {
            type: 'checkbox',
            name: 'albums',
            message: '¿Qué álbumes son suyos?',
            choices: currentAlbums
          },
          {
            type: 'input',
            name: 'listeners',
            message: '¿Cuántos oyentes mensuales tienen?',
          },
        ];
        inquirer.prompt(question).then((answers) => {
          const artistNames = answers.artists as string[];
          let artists: Artist[] = [];
          artistNames.forEach((artistName) => {
            artists.push(dataArtistManager.getDefinedArtist(artistName) as Artist);
          });
          const genreNames = answers.genres as GenreName[];
          let genres: Genre[] = [];
          genreNames.forEach((genreName) => {
            genres.push(dataGenreManager.getDefinedGenre(genreName) as Genre);
          });
          const albumNames = answers.albums as string[];
          let albums: Album[] = [];
          albumNames.forEach((albumName) => {
            albums.push(dataAlbumManager.getDefinedAlbum(albumName) as Album);
          });
          const added = dataGroupManager.addNewGroup(
            new Group(answers.name, artists, answers.year as number,
              genres, albums, answers.listeners as number));
          
          if (added === 0) {
            console.log(`Grupo ${answers.name} añadido`);
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

      case 'Borrar':
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
          dataGroupManager.deleteGroup(answers.election);
          console.log(`Grupo ${answers.election} eliminado`);
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

function modifyArtistsPrompt(): void {
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
              name: 'name',
              message: '¿Cuál es el nombre del artista?'
            },
            {
              type: 'checkbox',
              name: 'groups',
              message: '¿A que grupo(s) pertenece?',
              choices: currentGroups
            },
            {
              type: 'checkbox',
              name: 'albums',
              message: '¿En qué albumes ha participado?',
              choices: currentAlbums
            },
            {
              type: 'checkbox',
              name: 'genres',
              message: '¿A qué género(s) pertenece?',
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
            const groupNames = answers.groups as string[];
            let groups: Group[] = [];
            groupNames.forEach((groupName) => {
              groups.push(dataGroupManager.getDefinedGroup(groupName) as Group);
            });
            const genreNames = answers.genres as GenreName[];
            let genres: Genre[] = [];
            genreNames.forEach((genreName) => {
              genres.push(dataGenreManager.getDefinedGenre(genreName) as Genre);
            });
            const albumNames = answers.albums as string[];
            let albums: Album[] = [];
            albumNames.forEach((albumName) => {
              albums.push(dataAlbumManager.getDefinedAlbum(albumName) as Album);
            });
            const songNames = answers.songs as string[];
            let songs: Song[] = [];
            songNames.forEach((songName) => {
              songs.push(dataSongManager.getDefinedSong(songName) as Song);
            });
            const added = dataArtistManager.addNewArtist(
                new Artist(answers.name, groups, genres, albums, songs));
            if (added === 0) {
              console.log(`Artista ${answers.electionGenre} añadido`);    
            } else {
              console.log('Error, ya existe ese artista.');
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

function modifyPlayListsPrompt(): void {
  console.clear();
  console.log('Gestor de PlayLists');
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
        console.log('Añadir una playlist nueva');
        let addPlayListQuestions = [
          {
            type: 'input',
            name: 'playListName',
            message: '¿Cuál es el nombre de la PlayList?'
          },
          {
            type: 'list',
            name: 'songsInside',
            message: '¿Que canciones quiere poner en la playlist?',
            choices: currentSongs
          },
          {
            type: 'input',
            name: 'duration',
            message: '¿Cuál es su duración (en minutos)?'
          },
          {
            type: 'list',
            name: 'genresInside',
            message: '¿Que géneros hay en la playlist?',
            choices: currentGenres
          }
        ];
        inquirer.prompt(addPlayListQuestions).then((answers) => {
          const added = playlistManager.addNewPlaylist(
            new PlayList(answers.playListName, [], {minutes: 0, seconds: 0},
              []));
          if (added === 0) {
            console.log(`Playlist ${answers.playListName} añadida`);    
          } else {
            console.log('Error, ya existe una playlist con ese nombre y artista.');
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

promptUser();