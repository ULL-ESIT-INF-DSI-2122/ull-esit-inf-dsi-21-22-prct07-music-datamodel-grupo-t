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
import {PlayList} from './models/playlist';


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
        choices: ['Ver información de artistas y grupos', 'Ver playlists', 'Gestionar la colección', 'Salir'],
    },
  ];
  inquirer.prompt(questions).then((answers) => {    
    switch(answers['election']) {
      case 'Ver información de artistas y grupos':
        navigateArtistPrompt();
        break;
      case 'Ver playlists':
        checkPlaylistsPrompt();
        break;
      case 'Gestionar la colección':
        modifyCollectionPrompt();
        break;
      case 'Salir':
        console.log('Saliendo del programa...');
        break;
      }
    });
  return 0;
}

/**
 * Navigates throw the songs of the playlist
 */
function checkPlaylistsPrompt() {
  const currentPlaylist = dataPlaylistManager.getPlaylists();
  const currentPlaylistNames = dataPlaylistManager.getPlaylistNames();
  console.log('Playlists en la colección:');
  currentPlaylist.forEach(playlist => {
    console.log(playlist.asString());
  });
  const questions = [
    {
      type: 'list',
      name: 'playlistChoose',
      message: '¿Qué playlist desea consultar?',
      choices: currentPlaylistNames.concat('Atrás'),
    }
  ];
  inquirer.prompt(questions).then((answers) => {
    if (answers.playlistChoose !== 'Atrás') {
      consultPlaylistPrompt(answers.playlistChoose);
    } else {
      promptUser();
    }
  });
}


function consultPlaylistPrompt(playlistCheck: string, mode = 'default') {
  console.clear();
  console.log(`Canciones de la playlist ${playlistCheck}`);
  let playlist = dataPlaylistManager.getSpecificPlaylist(playlistCheck) as PlayList;
  let songs: Song[] = [];
  switch (mode) {
    case 'default':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'UpAlphabet');
      break;
    case 'DownAlphabet':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'DownAlphabet');
      break;
    case 'UpArtist':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'UpArtist');
      break;
    case 'DownArtist':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'DownArtist');
      break;
    case 'UpYear':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'UpYear');
      break;
    case 'DownYear':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'DownYear');
      break;     
    case 'UpTime':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'UpTime');
      break;    
    case 'DownTime':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'DownTime');
      break;   
    case 'UpGenre':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'UpGenre');
      break; 
    case 'DownGenre':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'DownGenre');
      break;
    case 'UpViews':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'UpViews');
      break;
    case 'DownViews':
      songs = dataPlaylistManager.orderedSongsFromPlaylist(playlist, 'DownViews');
      break;
  }

  songs.forEach((song, index) => {
    console.log(`${index + 1}) ${song.asString()}`);
  });
  
  const questions = [
    {
        type: 'list',
        name: 'order',
        message: '¿Qué desea hacer?',
        choices: ['Atrás',
        'Ver en órden alfabético por título ascendente', 'Ver en órden alfabético por título descendente',
        'Ver en órden alfabético por artista ascendente', 'Ver en órden alfabético por artista descendente',
        'Ver por año de lanzamiento ascendiente', 'Ver por año de lanzamiento descendiente', 
        'Ver por duración de canción ascendente', 'Ver por duración de canción descendente',
        'Ver por género, ascendente', 'Ver por género, descendente', 
        'Ver por número de reproducciones totales ascendente', 'Ver por número de reproducciones totales descendente'],
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    switch(answers.order) {
      case 'Atrás':
        promptUser();
        break;
      case 'Ver en órden alfabético por título ascendente':
        consultPlaylistPrompt(playlistCheck);
        break;
      case 'Ver en órden alfabético por título descendente':
        consultPlaylistPrompt(playlistCheck, 'DownAlphabet');
        break;
      case 'Ver en órden alfabético por artista ascendente':
        consultPlaylistPrompt(playlistCheck, 'UpArtist');
        break;
      case 'Ver en órden alfabético por artista descendente':
        consultPlaylistPrompt(playlistCheck, 'DownArtist');
        break;
      case 'Ver por año de lanzamiento ascendiente':
        consultPlaylistPrompt(playlistCheck, 'UpYear');
        break;
      case 'Ver por año de lanzamiento descendiente':
        consultPlaylistPrompt(playlistCheck, 'DownYear');
        break;     
      case 'Ver por duración de canción ascendente':
        consultPlaylistPrompt(playlistCheck, 'UpTime');
        break;    
      case 'Ver por duración de canción descendente':
        consultPlaylistPrompt(playlistCheck, 'DownTime');
        break;   
      case 'Ver por género, ascendente':
        consultPlaylistPrompt(playlistCheck, 'UpGenre');
        break; 
      case 'Ver por género, descendente':
        consultPlaylistPrompt(playlistCheck, 'DownGenre');
        break;
      case 'Ver por número de reproducciones totales ascendente':
        consultPlaylistPrompt(playlistCheck, 'UpViews');
        break;
      case 'Ver por número de reproducciones totales descendente':
        consultPlaylistPrompt(playlistCheck, 'DownViews');
        break;
      default:
        promptUser();
    }
  });
}


function checkPlaylistOfArtist(checkArtist: string) {
  const questions = [
    {
        type: 'list',
        name: 'playlistOrder',
        message: '¿Cómo desea ver las playlists relacionadas del artista o grupo?',
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
    console.log(`Las playlists relacionadas con ${checkArtist} son:`)
    playlistsOfArtist.forEach((playlist, index) => {
      console.log(`${index + 1}) ${playlist.asString()}`);
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


function navigateArtistPrompt() {
  console.clear();
  console.log('Información de artistas y grupos');
  const currentArtists = dataArtistManager.getArtistNames();
  const currentGroups = dataGroupManager.getGroupNames();
  const questions = [
    {
        type: 'list',
        name: 'artist',
        message: '¿Qué artista o grupo desea ver?',
        choices: currentArtists.concat(currentGroups),
    },
    {
      type: 'list',
      name: 'media',
      message: '¿Qué desea ver del artista o grupo?',
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
        message: '¿Cómo desea ver las canciones?',
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
    console.log(`Las canciones de ${checkArtist} son:`)
    songsOfArtist.forEach((song, index) => {
      console.log(`${index + 1}) ${song.asString()}`);
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
        message: '¿Cómo desea ver los álbumes?',
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
    console.log(`Los álbumes de ${checkArtist} son:`)
    albumsOfArtist.forEach((album, index) => {
      console.log(`${index + 1}) ${album.asString()}`);
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
  console.log('Gestión de la biblioteca musical');
  
  const questions = [
    {
        type: 'list',
        name: 'election',
        message: '¿Que desea editar?',
        choices: ['Playlists', 'Géneros', 'Canciones', 'Álbums', 'Grupos', 'Artistas', 'Atrás'],
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
      case 'Playlists':
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
  const currentArtist: string[] = dataArtistManager.getArtistNames();
  const currentGenres: string[] = dataGenreManager.getGenreNames();
  const currentGroups: string[] = dataGroupManager.getGroupNames();
  const currentAlbums: string[] = dataAlbumManager.getAlbumsNames();
  const currentSongs: string[] = dataSongManager.getSongNames();  const question = [
    {
      type: 'list',
      name: 'election',
      message: '¿Que desea hacer (añadir, borrar o modificar un género)?',
      choices: ['Añadir', 'Modificar', 'Borrar', 'Atrás']
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

    case 'Modificar':
      console.log('Menú de modificación de géneros');
        let question2 = [
            {
              type: 'list',
              name: 'name',
              message: '¿Cuál es el nombre del género?',
              choices: currentArtist
            },
            {
              type: 'list',
              name: 'song',
              message: '¿Quieres asignarle una nueva canción?',
              choices: ['No, siguiente'].concat(currentSongs),
            },
            {
              type: 'list',
              name: 'album',
              message: '¿Quieres asignarle un nuevo album?',
              choices: ['No, siguiente'].concat(currentAlbums),
            },
            {
              type: 'checkbox',
              name: 'artist',
              message: '¿Quieres asignarle un nuevo artista o grupo al género?',
              choices: ['No, siguiente'].concat(currentArtist).concat(currentGroups),
            },
          ];
          inquirer.prompt(question2).then((answers) => {
            const genre: Genre = dataGenreManager.getDefinedGenre(answers.name) as Genre;
            if (answers.song != 'No, siguiente') {
              genre.addSong(dataSongManager.getDefinedSong(answers.song) as Song);
            }
            if (answers.album != 'No, siguiente') {
              genre.addAlbum(dataAlbumManager.getDefinedAlbum(answers.albums) as Album);
            }
            if (answers.artist != 'No, siguiente') {
              genre.addArtists(dataArtistManager.getDefinedArtist(answers.artist) as Artist);
            }
            dataGenreManager.deleteGenre(genre.getName());  
            dataGenreManager.addNewGenre(new Genre(genre.getName(), genre.getArtistCollection(), genre.getAlbumCollection(),
              genre.getSongCollection()));
            
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
        
      case 'Modificar':
        console.log('Modificar un género');
        const genreElection = [
          {
            type: 'list',
            name: 'election',
            message: '¿Qué desea género desea administrar?',
            choices: currentGenres,
          }
        ];
        inquirer.prompt(genreElection).then((answers: any) => {
          const election = answers.election;
          // dataGenreManager.modifyGenre(election);
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
      choices: ['Añadir', 'Modificar', 'Borrar', 'Atrás']
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

      case 'Modificar':
        console.log('Menú de modificación de album');
          let question = [
              {
                type: 'list',
                name: 'name',
                message: '¿Cuál es el nombre del album?',
                choices: currentAlbums
              },
              {
                type: 'list',
                name: 'songs',
                message: '¿Quieres asignarle una nueva canción?',
                choices: ['No, siguiente'].concat(currentSongs)
              },
              {
                type: 'list',
                name: 'artist',
                message: '¿Quieres asignarle a otro artista?',
                choices: ['No, siguiente'].concat(currentArtist)
              },
              {
                type: 'list',
                name: 'genre',
                message: '¿Quieres asignarle un nuevo género al album?',
                choices: ['No, siguiente'].concat(currentGenres)
              },
            ];
            inquirer.prompt(question).then((answers) => {
              const album: Album = dataAlbumManager.getDefinedAlbum(answers.name) as Album;
              if (answers.songs != 'No, siguiente') {
                album.addSong(dataSongManager.getDefinedSong(answers.songs) as Song);
              }
              if (answers.artist != 'No, siguiente') {
                album.setArtist(answers.artist);
                dataAlbumManager.deleteAlbum(album.getName());                
              }
              if (answers.genre != 'No, siguiente') {
                album.getGenres().push(dataGenreManager.getDefinedGenre(answers.genre) as Genre)
                album.setGenre(album.getGenres());
              }              
              dataAlbumManager.deleteAlbum(album.getName());
              dataAlbumManager.addNewAlbum(new Album(album.getName(), album.getArtist(), album.getYear(),
                album.getGenres(), Array.from(album.getSongs())));

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
  const currentSongs = dataSongManager.getSongNames();


  const question = [
    {
      type: 'list',
      name: 'election',
      message: '¿Que desea hacer (añadir, borrar o modificar un grupo)?',
      choices: ['Añadir', 'Modificar', 'Borrar', 'Atrás']
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

      case 'Modificar':
        console.log('Menú de modificación de un grupo');
          let question2 = [
              {
                type: 'list',
                name: 'name',
                message: '¿Cuál es el nombre del grupo?',
                choices: currentGroups
              },
              {
                type: 'list',
                name: 'artist',
                message: '¿Quieres asignarle a otro artista participante?',
                choices: ['No, siguiente'].concat(currentArtist)
              },
              {
                type: 'list',
                name: 'genre',
                message: '¿Quieres asignarle un nuevo género al grupo?',
                choices: ['No, siguiente'].concat(currentGenres)
              },
            ];
            inquirer.prompt(question2).then((answers) => {
              const group: Group = dataGroupManager.getDefinedGroup(answers.name) as Group;
              if (answers.artist != 'No, siguiente') {
                group.addArtist(dataArtistManager.getDefinedArtist(answers.artist) as Artist);
              }
              if (answers.genre != 'No, siguiente') {
                group.addGenre(dataGenreManager.getDefinedGenre(answers.genre) as Genre)
              }              
              dataGroupManager.deleteGroup(group.getName());
              dataGroupManager.addNewGroup(new Group(group.getName(), group.getArtists(), group.getYearOfCreation(),
                group.getRelatedGenres(), group.getAlbums(), group.getMonthlyListeners()));

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
  const currentArtist: string[] = dataArtistManager.getArtistNames();
  const currentGenres: string[] = dataGenreManager.getGenreNames();
  const currentGroups: string[] = dataGroupManager.getGroupNames();
  const currentAlbums: string[] = dataAlbumManager.getAlbumsNames();
  const currentSongs: string[] = dataSongManager.getSongNames();

  const question = [
    {
      type: 'list',
      name: 'election',
      message: '¿Que desea hacer (añadir, borrar o modificar un artista)?',
      choices: ['Añadir', 'Modificar', 'Borrar', 'Atrás']
    }
  ];

  inquirer.prompt(question).then((answers) => {
    switch(answers['election']) {
      case 'Añadir':
        console.log('Añadir un nuevo artista');
        let questions = [
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
          inquirer.prompt(questions).then((answers) => {
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
    
    case 'Modificar':
      console.log('Menú de modificación de artista');
        let question = [
            {
              type: 'list',
              name: 'name',
              message: '¿Cuál es el nombre del artista?',
              choices: currentArtist
            },
            {
              type: 'list',
              name: 'song',
              message: '¿Quieres asignarle una nueva canción?',
              choices: ['No, siguiente'].concat(currentSongs),
            },
            {
              type: 'list',
              name: 'album',
              message: '¿Quieres asignarle un nuevo album?',
              choices: ['No, siguiente'].concat(currentAlbums),
            },
            {
              type: 'list',
              name: 'genre',
              message: '¿Quieres asignarle un nuevo género al artista?',
              choices: ['No, siguiente'].concat(currentGenres),
            },
            {
              type: 'list',
              name: 'dgenre',
              message: '¿Quieres borrar un género al artista?',
              choices: ['No, siguiente'].concat(currentGenres),
            },
            {
              type: 'list',
              name: 'dsong',
              message: '¿Quieres borrar una canción del artista?',
              choices: ['No, siguiente'].concat(currentSongs),
            },
          ];
          inquirer.prompt(question).then((answers) => {
            const artist: Artist = dataArtistManager.getDefinedArtist(answers.name) as Artist; 
            if (answers.song != 'No, siguiente') {
              artist.addPublishedSong(dataSongManager.getDefinedSong(answers.song) as Song);
            }
            if (answers.album != 'No, siguiente') {
              artist.addPublishedAlbum(dataAlbumManager.getDefinedAlbum(answers.albums) as Album);
            }
            if (answers.genre != 'No, siguiente') {
              artist.addGenre(dataGenreManager.getDefinedGenre(answers.genre) as Genre);
            }     
            if (answers.dgenre != 'No, siguiente') {
              const genreToDelete = dataGenreManager.getDefinedGenre(answers.genre) as Genre;
              if (artist.getGenres().indexOf(genreToDelete) !== -1) {
                if (artist.getGenres().length > 1) {
                  artist.removeGenre(genreToDelete.getName());
                } else {
                  console.log('No puedes dejar a un album sin géneros');
                }
              } else { 
                console.log('Ese género que deseas quitar no le pertenece al album');
              }
            } 
            if (answers.dsong != 'No, siguiente') {
              const songToDelete = dataSongManager.getDefinedSong(answers.dsong) as Song;
              if (Array.from(artist.getSongs()).indexOf(songToDelete) !== -1) {
                artist.removeSong(songToDelete.getName());
              } else { 
                console.log('Esta canción que deseas quitar no le pertenece al genero');
              }
            }
            console.log(artist.getGenres())
            dataArtistManager.deleteArtist(artist.getName()); 
            dataArtistManager.addNewArtist(new Artist(artist.getName(), artist.getGroups(), artist.getGenres(),
            artist.getAlbums(), artist.getSongs()));
            
            
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
      const questions2 = [
        {
          type: 'list',
          name: 'election',
          message: '¿Qué artista desea eliminar?',
          choices: currentArtist,
        }
      ];
      inquirer.prompt(questions2).then((answers) => {
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
  const currentPlaylists = dataPlaylistManager.getPlaylistNames();
  const question = [
    {
      type: 'list',
      name: 'election',
      message: '¿Que desea hacer?',
      choices: ['Crear una nueva playlist', 'Modificar una playlist', 'Borrar una playlist', 'Atrás']
    }
  ];

  inquirer.prompt(question).then((answers) => {
    switch(answers['election']) {
      case 'Crear una nueva playlist':
        let addPlayListQuestions = [
          {
            type: 'list',
            name: 'preexisting',
            message: '¿Desea crear la playlist a partir de una existente?',
            choices: ['Si', 'No']
          }
        ];
        inquirer.prompt(addPlayListQuestions).then((answers) => {
          if (answers.preexisting === 'Si') {
            inquirer.prompt([{
              type: 'list',
              name: 'playlistSelection',
              message: 'Seleccione la playlist que usará como plantilla:',
              choices: currentPlaylists
            }]).then(function(answers) {
              addNewPlaylistPrompt(answers.playlistSelection);
            });
          } else {
            addNewPlaylistPrompt();
          }
        });
        break;    

      case 'Modificar una playlist':
        break;

      case 'Borrar una playlist':
        // console.log('Eliminar una canción');
        // let question = [
        //   {
        //     type: 'list',
        //     name: 'election',
        //     message: '¿Qué canción desea eliminar?',
        //     choices: currentSongs,
        //   }
        // ];
        // inquirer.prompt(question).then((answers) => {
        //   dataSongManager.deleteSong(answers.election);
        //   console.log(`Canción ${answers.election} eliminada`);
        // });
        // inquirer.prompt([{
        //   name: 'continue',
        //   message: 'Pulse enter para continuar',
        //   type: 'input'
        // }]).then(function() {
        //   promptUser();
        // });
        break;
      
      case 'Atrás':
        promptUser();
        break;
    }
  });
}


function addNewPlaylistPrompt(playlistTemplateName = '') {
  const currentPlaylists = dataPlaylistManager.getPlaylistNames();
  inquirer.prompt([{
    type: 'input',
    name: 'playlistName',
    message: '¿Cuál es el nombre de la nueva playlist?:'
  }]).then(answers => {
    if (!currentPlaylists.includes(answers.playlistName)) {
      let newPlaylist = new PlayList(answers.playlistName);
      if (playlistTemplateName !== '') {
        const playlistTemplate = dataPlaylistManager.getSpecificPlaylist(playlistTemplateName) as PlayList;
        playlistTemplate.getSongs().forEach(song => {
          newPlaylist.addSong(song);
        });
        playlistTemplate.getGenres().forEach(genre => {
          newPlaylist.addGenre(genre);
        });
      }
      dataPlaylistManager.addNewPlaylist(newPlaylist);
      inquirer.prompt([{
        name: 'continue',
        message: 'Playlist creada con éxito, pulse enter para continuar',
        type: 'input'
      }]).then(function() {
        promptUser();
      });
    } else {
      console.log('¡Ya existe otra playlist con ese nombre!. Por favor, elija otro.');
      addNewPlaylistPrompt(playlistTemplateName);
    }
  });
}


promptUser();