import * as inquirer from 'inquirer';
import {DataGenreManager} from './managers/dataGenreManager';
import {DataArtistManager} from './managers/dataArtistManager';
import {DataAlbumManager} from './managers/dataAlbumManager';
import {DataGroupManager} from './managers/dataGroupManager';
import {DataSongManager, SongSchemaInterface} from './managers/dataSongManager';
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
const dataPlaylistManager = new Gestor(playlists);

export function promptUser() {
  console.clear();
  console.log('Bienvenido a la biblioteca musical');
  
  const questions = [
    {
        type: 'list',
        name: 'election',
        message: '¿Qué desea hacer?',
        choices: ['Ver información de artistas', 'Ver información de grupos', 'Ver playlist', 'Configuración', 'Salir'],
    },
  ];
  inquirer.prompt(questions).then((answers) => {    
    switch(answers['election']) {
      case 'Ver información de artistas':
        navigateArtistPrompt();
        break;
      case 'Ver información de grupos':
        navigateGroupPrompt();
        break;
      case 'Ver playlist':
        checkPlaylist();
        break;
      case 'Configuración':
        modifyCollectionPrompt();
        break;
      case 'Salir':
        console.log('Saliendo del programa...');
        break;
      }
    });
  return 0;
}

// function showAllPlaylistPrompt() {
//   const currentPlaylist = dataPlaylistManager.getPlaylists();
//   const questions = [
//     {
//         type: 'list',
//         name: 'songsOrder',
//         message: '¿Cómo desea ver las canciones del artista?',
//         choices: currentPlaylist,
//     },
//   ];
// }

/**
 * Navigates throw the songs of the playlist
 */
function checkPlaylist() {
  const currentPlaylist = dataPlaylistManager.getPlaylists();
  const questions = [
    {
      type: 'list',
      name: 'playlistChoose',
      message: '¿Qué playlist desea examinar?',
      choices: currentPlaylist,
    },
    {
      type: 'list',
      name: 'playlistOrder',
      message: '¿Cómo desea ver las canciones de la playlists?',
      choices: [
        'En órden alfabético por canción ascendente', 'En órden alfabético por canción descendente'/* ,
        'En órden alfabético por artista ascendente', 'En órden alfabético por artista ascendente',
        'Por año de lanzamiento ascendiente', 'Por año de lanzamiento descendiente', 
        'Por duración de canción ascendente', 'Por duración de canción descendente',
        'Por género, ascendente', 'Por género, descendente', 'Por reproducciones totales ascendente',
        'Por reproducciones totales descendente' */
      ],
    },
  ];
  const gestor: Gestor = new Gestor;
  let playlist: PlayList;
  let songs: Song[] = [];
  inquirer.prompt(questions).then((answers) => {
    switch(answers.playlistOrder) {
      case 'En órden alfabético por canción ascendente':
        playlist = gestor.getSpecificPlaylist(answers.playlistChoose);
        console.log(playlist.getName());
        songs = gestor.orderedSongsFromPlaylist(playlist, 'UpAlphabet');
        break;
      case 'En órden alfabético por canción descendente':
        playlist = gestor.getSpecificPlaylist(answers.playlistChoose);
        songs = gestor.orderedSongsFromPlaylist(playlist, 'DownAlphabet');
        break;
      // case 'En órden alfabético por artista ascendente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'UpArtist');
      //   break;
      // case 'En órden alfabético por artista descendente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'DownArtist');
      //   break;
      // case 'Por año de lanzamiento ascendiente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'UpYear');
      //   break;
      // case 'Por año de lanzamiento descendiente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'DownYear');
      //   break;     
      // case 'Por duración de canción ascendente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'UpTime');
      //   break;    
      // case 'Por duración de canción descendente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'DownTime');
      //   break;   
      // case 'Por género, ascendente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'UpGenre');
      //   break; 
      // case 'Por género, descendente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'DownGenre');
      //   break;
      // case 'Por reproducciones totales ascendente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'UpViewns');
      //   break;
      // case 'Por reproducciones totales descendente':
      //   songs = gestor.orderedSongsFromPlaylist(answers.playlistChoose, 'DownViews');
      //   break;
    
    }
    console.log(`Canciones de ${answers.playlistChoose} ordenadas: `);
    songs.forEach((song, index) => {
      console.log(`${index + 1}) ${song.getName()}`);
    });
    inquirer.prompt([{
      name: 'continue',
      message: 'Pulse enter para continuar',
      type: 'input'
    }]).then(function() {
      promptUser();
    });
  });
}

function checkPlaylistOfArtist(checkArtist: string) {
  const questions = [
    {
        type: 'list',
        name: 'playlistOrder',
        message: '¿Cómo desea ver las playlists relacionadas del artista?',
        choices: [
          'En órden alfabético ascendente', 'En órden alfabético descendente',]
    },
  ];
  let playlistsOfArtist: PlayList[] = [];
  inquirer.prompt(questions).then((answers) => {
    switch(answers.playlistOrder) {
      case 'En órden alfabético ascendente':
        playlistsOfArtist = dataPlaylistManager.getPlaylistInOrder('UpAlphabet', checkArtist);
        break;
      case 'En órden alfabético descendente':
        playlistsOfArtist = dataPlaylistManager.getPlaylistInOrder('DownAlphabet', checkArtist);
        break;
    }
    console.log(`Las playlists relacionadas con el artista ${checkArtist} son:`)
    playlistsOfArtist.forEach((playlist, index) => {
      console.log(`${index + 1}) ${playlist.getName()}`);
    });
    inquirer.prompt([{
      name: 'continue',
      message: 'Pulse enter para continuar',
      type: 'input'
    }]).then(function() {
      promptUser();
    });
  });
}

function navigateGroupPrompt() {
  // console.clear();
  // console.log('Información de artistas');
  // const currentArtist = dataArtistManager.getArtistNames();
  // const questions = [
  //   {
  //       type: 'list',
  //       name: 'artist',
  //       message: '¿Qué artista desea ver?',
  //       choices: currentArtist,
  //   },
  //   {
  //     type: 'list',
  //     name: 'media',
  //     message: '¿Qué desea ver del artista?',
  //     choices: ['Canciones', 'Álbumes', 'Playlists'],
  //   },
  // ];
  // let checkArtist = "";
  // inquirer.prompt(questions).then((answers) => {
  //   checkArtist = answers.artist as string;
  //   switch(answers.media) {
  //     case 'Canciones':
  //       break;
  //     case 'Álbumes':
  //       break;
  //     case 'Playlists':
  //       break;
  //   }
  // });
}


function navigateArtistPrompt() {
  console.clear();
  console.log('Información de artistas');
  const currentArtist = dataArtistManager.getArtistNames();
  const questions = [
    {
        type: 'list',
        name: 'artist',
        message: '¿Qué artista desea ver?',
        choices: currentArtist,
    },
    {
      type: 'list',
      name: 'media',
      message: '¿Qué desea ver del artista?',
      choices: ['Canciones', 'Álbumes', 'Playlists'],
    },
  ];
  let checkArtist = "";
  inquirer.prompt(questions).then((answers) => {
    checkArtist = answers.artist as string;
    switch(answers.media) {
      case 'Canciones':
        checkSongsOfArtist(checkArtist);
        break;
      case 'Álbumes':
        checkAlbumsOfArtist(checkArtist);
        break;
      case 'Playlists':
        checkPlaylistOfArtist(checkArtist);
        break;
    }
  });
}


function checkSongsOfArtist(checkArtist: string) {
  const questions = [
    {
        type: 'list',
        name: 'songsOrder',
        message: '¿Cómo desea ver las canciones del artista?',
        choices: [
          'En órden alfabético ascendente', 'En órden alfabético descendente',
          'Por número de reproducciones ascendente', 'Por número de reproducciones descendente',
          'Mostrar únicamente singles'],
    },
  ];
  let songsOfArtist: Song[] = [];
  inquirer.prompt(questions).then((answers) => {
    switch(answers.songsOrder) {
      case 'En órden alfabético ascendente':
        songsOfArtist = dataSongManager.getSongsInOrder('UpAlphabet', checkArtist);
        break;
      case 'En órden alfabético descendente':
        songsOfArtist = dataSongManager.getSongsInOrder('DownAlphabet', checkArtist);
        break;
      case 'Por número de reproducciones ascendente':
        songsOfArtist = dataSongManager.getSongsInOrder('UpViews', checkArtist);
        break;
      case 'Por número de reproducciones descendente':
        songsOfArtist = dataSongManager.getSongsInOrder('DownViews', checkArtist);
        break;
      case 'Mostrar únicamente singles':
        songsOfArtist = dataSongManager.getSongsInOrder('Singles', checkArtist);
        break;
    }
    console.log(`Las canciones del artista ${checkArtist} son:`)
    songsOfArtist.forEach((song, index) => {
      console.log(`${index + 1}) ${song.getName()}`);
    });
    inquirer.prompt([{
      name: 'continue',
      message: 'Pulse enter para continuar',
      type: 'input'
    }]).then(function() {
      promptUser();
    });
  });
}


function checkAlbumsOfArtist(checkArtist: string) {
  const questions = [
    {
        type: 'list',
        name: 'albumOrder',
        message: '¿Cómo desea ver los álbumes del artista?',
        choices: [
          'En órden alfabético ascendente', 'En órden alfabético descendente',
          'Por año de lanzamiento'],
    },
  ];
  let albumsOfArtist: Album[] = [];
  inquirer.prompt(questions).then((answers) => {
    switch(answers.albumOrder) {
      case 'En órden alfabético ascendente':
        albumsOfArtist = dataAlbumManager.getAlbumsInOrder('UpAlphabet', checkArtist);
        break;
      case 'En órden alfabético descendente':
        albumsOfArtist = dataAlbumManager.getAlbumsInOrder('DownAlphabet', checkArtist);
        break;
      case 'Por año de lanzamiento':
        albumsOfArtist = dataAlbumManager.getAlbumsInOrder('YearOfRelease', checkArtist);
        break;
    }
    console.log(`Los álbumes del artista ${checkArtist} son:`)
    albumsOfArtist.forEach((album, index) => {
      console.log(`${index + 1}) ${album.getName()}`);
    });
    inquirer.prompt([{
      name: 'continue',
      message: 'Pulse enter para continuar',
      type: 'input'
    }]).then(function() {
      promptUser();
    });
  });
}


function modifyCollectionPrompt() {
  console.clear();
  console.log('Configuración de la biblioteca musical');
  
  const questions = [
    {
        type: 'list',
        name: 'election',
        message: '¿Que desea hacer (añadir, borrar y/o modificar)?',
        choices: ['Géneros', 'Canciones', 'Álbums', 'Grupos', 'Artistas', 'PlayLists', 'Atrás'],
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
      case 'Atrás':
        promptUser();
        break;
      }
    });
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
          const added = dataPlaylistManager.addNewPlaylist(
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