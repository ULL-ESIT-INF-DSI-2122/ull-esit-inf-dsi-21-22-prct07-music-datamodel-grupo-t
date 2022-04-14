import {Genre} from '../models/genre'
import {Album} from '../models/album'
import {Artist} from '../models/artist'
import {Group} from '../models/group'
import {Song} from '../models/song'
import {PlayList} from '../models/playlist'
let genres_aux: Genre[] = [
  new Genre("Rap", [], [], []),
  new Genre("Pop"),
  new Genre("Trap"),
  new Genre("Electro"),
  new Genre("Classic"),
  new Genre("Reggaeton"),
  new Genre("Rock"),
  new Genre("Country"),
  new Genre("Popular"),
  new Genre("Blues"),
]

let artists_aux: Artist[] = [
  new Artist("Kidd Keo"),
  new Artist("Martin Garrix"),
  new Artist("Mozart"),
  new Artist("Nicky Jam"),
  new Artist("John Denver"),
  new Artist("Natos"),
  new Artist("Waor"),
  new Artist("Dani Martín")
]

let albums_aux: Album[] = [
  new Album("Fénix"),
  new Album("Back Home Again"),
  new Album("Cicatrices"),
  new Album("Carretera"),
  new Album("Zapatillas"),
  new Album("Personas"),
  new Album("Americana")
]

export let groups: Group[] = [
  new Group("Natos y Waor",[artists_aux[5],artists_aux[6]],2011,[genres_aux[0]],[albums_aux[2],albums_aux[3]],1396606),
  new Group("El Canto del Loco", [artists_aux[7]],1994,[genres_aux[1]],[albums_aux[4],albums_aux[5]],2622773),
  new Group("The Offspring",[],1984,[genres_aux[6]],[albums_aux[6]],12477538),
  new Group("Compay Segundo",[],1907,[genres_aux[8]],[],530772),
  new Group("The Blues Brothers",[],1978,[genres_aux[9]],[],1172651)
]


export let songs: Song[] = [
  new Song("Dracukeo","Kidd Keo",{minutes: 2, seconds: 36},[genres_aux[2]],true,81901392),
  new Song("Mama","Kidd Keo",{minutes: 4, seconds: 25},[genres_aux[2]],true,4201425),
  new Song("Lollypop","Kidd Keo",{minutes: 3, seconds: 17},[genres_aux[2]],true,5738921),
  new Song("Serpiente Veneno","Kidd Keo",{minutes: 3, seconds: 11},[genres_aux[2]],true,7299872),
  new Song("One Million","Kidd Keo",{minutes: 2, seconds: 58},[genres_aux[2]],true,43670110), 

  new Song("High on Life","Martin Garrix",{minutes: 3, seconds: 12},[genres_aux[3]],true,431270356),
  new Song("Animals","Martin Garrix",{minutes: 4, seconds: 1},[genres_aux[3]],true,64782811),
  new Song("Scared to Be Lonely","Martin Garrix",{minutes: 5, seconds: 7},[genres_aux[3]],true,78540184),
  new Song("Reboot","Martin Garrix",{minutes: 3, seconds: 41},[genres_aux[3]],true,36829188),
  new Song("Limitless","Martin Garrix",{minutes: 3, seconds: 45},[genres_aux[3]],true,39200193),

  new Song("Fantasia in D minor","Mozart",{minutes: 7, seconds: 52},[genres_aux[4]],true,3737821),
  new Song("Piano Sonata No 16","Mozart",{minutes: 6, seconds: 14},[genres_aux[4]],true,383765011),
  new Song("Symphony No 25","Mozart",{minutes: 8, seconds: 18},[genres_aux[4]],true,9836161),
  new Song("Turkish March","Mozart",{minutes: 4, seconds: 59},[genres_aux[4]],true,7198874),
  new Song("Piano Concerto No 21","Mozart",{minutes: 10, seconds: 42},[genres_aux[4]],true,5183177),

  new Song("Travesuras","Nicky Jam",{minutes: 3, seconds: 17},[genres_aux[5]],false,4522113), 
  new Song("Hasta El Amanecer","Nicky Jam",{minutes: 3, seconds: 24},[genres_aux[5]],false,12446941), 
  new Song("El Perdón","Nicky Jam",{minutes: 4, seconds: 28},[genres_aux[5]],false,1199631), 
  new Song("Poblado-Remix","Nicky Jam",{minutes: 4, seconds: 59},[genres_aux[5]],true,67181921), 
  new Song("Bzrp Session 49","Nicky Jam",{minutes: 3, seconds: 47},[genres_aux[5]],true,7981138),

  new Song("Take Me Home, Country Roads","John Denver",{minutes: 4, seconds: 23},[genres_aux[7]],false,43524675),
  new Song("Annie's Song","John Denver",{minutes: 3, seconds: 45},[genres_aux[7]],true,8813345),
  new Song("Rocky Mountain High","John Denver",{minutes: 5, seconds: 37},[genres_aux[7]],true,43515345),
  new Song("Back Home Again","John Denver",{minutes: 3, seconds: 28},[genres_aux[7]],false,74354313),
  new Song("On the Road","John Denver",{minutes: 4, seconds: 19},[genres_aux[7]],false,31424577),

  new Song("Cicatrices","Natos y Waor",{minutes: 3, seconds: 32},[genres_aux[0]],false,23423432), 
  new Song("Carretera","Natos y Waor",{minutes: 4, seconds: 53},[genres_aux[0]],false,456893111),
  new Song("Nosotros","Natos y Waor",{minutes: 4, seconds: 29},[genres_aux[0]],true,9329371), 
  new Song("Piratas","Natos y Waor",{minutes: 3, seconds: 38},[genres_aux[0]],false,3827261), 
  new Song("Bicho Raro","Natos y Waor",{minutes: 3, seconds: 23},[genres_aux[0]],false,4865627),

  new Song("Zapatillas","El Canto del Loco",{minutes: 4, seconds: 3},[genres_aux[1]],false,25624533), 
  new Song("Besos","El Canto del Loco",{minutes: 3, seconds: 19},[genres_aux[1]],false,85668563),  
  new Song("Volvera","El Canto del Loco",{minutes: 5, seconds: 58},[genres_aux[1]],false,8838432),  
  new Song("Peter Pan","El Canto del Loco",{minutes: 4, seconds: 36},[genres_aux[1]],true,67900256),
  new Song("La Madre de Jose","El Canto del Loco",{minutes: 4, seconds: 17},[genres_aux[1]],true,43654680),  

  new Song("The Kids Aren't Alright","The Offspring",{minutes: 3, seconds: 12},[genres_aux[6]],false,34543578), 
  new Song("You're Gonna Go Far, Kid","The Offspring",{minutes: 4, seconds: 51},[genres_aux[6]],false,9744001), 
  new Song("Self Esteem","The Offspring",{minutes: 4, seconds: 31},[genres_aux[6]],true,54357953), 
  new Song("Pretty Fly","The Offspring",{minutes: 4, seconds: 48},[genres_aux[6]],true,91800532), 
  new Song("Why Don't You Get a Job","The Offspring",{minutes: 3, seconds: 36},[genres_aux[6]],true,34017389), 

  new Song("Guajira guantananmera","Compay Segundo",{minutes: 3, seconds: 45},[genres_aux[8]],true,9187631),
  new Song("Chan chan","Compay Segundo",{minutes: 3, seconds: 16},[genres_aux[8]],true,821940),
  new Song("Lágrimas negras","Compay Segundo",{minutes: 4, seconds: 25},[genres_aux[8]],true,2391764),
  new Song("La negra Tomasa","Compay Segundo",{minutes: 3, seconds: 34},[genres_aux[8]],true,2800641),
  new Song("Hasta siempre","Compay Segundo",{minutes: 4, seconds: 51},[genres_aux[8]],true,3198415), /*Todas singles */

  new Song("Everybody Needs Somebody to Love","The Blues Brothers",{minutes: 3, seconds: 56},[genres_aux[9]],true,39845210),
  new Song("Think","The Blues Brothers",{minutes: 4, seconds: 53},[genres_aux[9]],true,4828171),
  new Song("Sweet Home Chicago","The Blues Brothers",{minutes: 5, seconds: 16},[genres_aux[9]],true,219471),
  new Song("Gimme Some Lovin","The Blues Brothers",{minutes: 2, seconds: 35},[genres_aux[9]],true,607613),
  new Song("Soul Man","The Blues Brothers",{minutes: 3, seconds: 14},[genres_aux[9]],true,2816103) /*Todas singles */
]

export let artists: Artist[] = [
  new Artist("Kidd Keo",[],[genres_aux[2]],[],[songs[0],songs[1],songs[2],songs[3],songs[4]]),
  new Artist("Martin Garrix",[],[genres_aux[3]],[],[songs[5],songs[6],songs[7],songs[8],songs[9]]),
  new Artist("Mozart",[],[genres_aux[4]],[],[songs[10],songs[11],songs[12],songs[13],songs[14]]),
  new Artist("Nicky Jam",[],[genres_aux[5]],[],[songs[15],songs[16],songs[17],songs[18],songs[19]]),
  new Artist("John Denver",[],[genres_aux[7]],[],[songs[20],songs[21],songs[22],songs[23],songs[24]]),
  new Artist("Natos",[groups[0]],[genres_aux[0]],[],[songs[25],songs[26],songs[27],songs[28],songs[29]]),
  new Artist("Waor",[groups[0]],[genres_aux[0]],[],[songs[25],songs[26],songs[27],songs[28],songs[29]]),
  new Artist("Dani Martín",[groups[1]],[genres_aux[1]],[],[songs[30],songs[31],songs[32],songs[33],songs[34]])
]

export let albums: Album[] = [
  new Album("Fénix","Nicky Jam",2007,[genres_aux[5]],[songs[15],songs[16],songs[17]]),
  new Album("Back Home Again","John Denver",1987,[genres_aux[7]],[songs[20],songs[23],songs[24]]),
  new Album("Cicatrices","Natos y Waor",2018,[genres_aux[0]],[songs[25],songs[29]]),
  new Album("Carretera","Natos y Waor",2016,[genres_aux[0]],[songs[26],songs[28]]),
  new Album("Zapatillas","Dani Martín",1998,[genres_aux[1]],[songs[30],songs[31],songs[32]]),
  new Album("Personas","Dani Martín",2009,[genres_aux[1]],[songs[33]]),
  new Album("Americana","The Offspring",1995,[genres_aux[1]],[songs[35],songs[36]])
]

export let genres: Genre[] = [
  new Genre("Rap",[groups[0]],[albums[2],albums[3]],[songs[25],songs[26],songs[27],songs[28],songs[29]]),
  new Genre("Pop",[groups[1]],[albums[4],albums[5]],[songs[30],songs[31],songs[32],songs[33],songs[34]]),
  new Genre("Trap",[artists[0]],[],[songs[0],songs[1],songs[2],songs[3],songs[4]]),
  new Genre("Electro",[artists[1]],[],[songs[0],songs[1],songs[2],songs[3],songs[4]]),
  new Genre("Classic",[artists[2]],[],[songs[5],songs[6],songs[7],songs[8],songs[9]]),
  new Genre("Reggaeton",[artists[3]],[],[songs[10],songs[11],songs[12],songs[13],songs[14]]),
  new Genre("Rock",[groups[2]],[albums[6]],[songs[35],songs[36],songs[37],songs[38],songs[39]]),
  new Genre("Country",[artists[4]],[],[songs[20],songs[21],songs[22],songs[23],songs[24]]),
  new Genre("Popular",[groups[3]],[],[songs[40],songs[41],songs[42],songs[43],songs[44]]),
  new Genre("Blues",[groups[4]],[],[songs[45],songs[46],songs[47],songs[48],songs[49]]),
]

export let playlists: PlayList[] = [
  new PlayList("RapTrap",[songs[26],songs[27],songs[0],songs[3],songs[4]],{minutes: 20, seconds: 28},[genres[0],genres[2]]),
  new PlayList("PopRock",[songs[30],songs[31],songs[32],songs[33],songs[34],songs[37],songs[38],songs[39]],{minutes: 35, seconds: 58},[genres[1],genres[6]]),
  new PlayList("CountryPopularBlues",[songs[20],songs[23],songs[42],songs[44],songs[49]],{minutes: 24, seconds: 18},[genres[7],genres[8],genres[9]])
]