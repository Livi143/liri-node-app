// using .env to hide API keys
require("dotenv").config();

// project variables
var keys = require("./keys.js");
var fs = required("fs");
var Spotify = required("node-spotify-api");
var Spotify = new Spotify(keys.spotify);
var request = require("request");
var movieName = process.argv[3];
var liriReturn = process.argv[2];
var bandsInTown = require("bandsInTown");
var client = new bandsInTown(keys.bandsInTown);

// "switch-board"
switch (liriReturn) {
    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this": 
        movieThis();
        break;
    
    case "do-what-it-says":
        doWhatItSays();
        break;
          
    // instructions for first-time user in command line
    default: console.log(`\n type any command after "node liri.js:\n "spotify-this-song" (and any song title)\n "movie-this" (and any movie title)\n "do-what-it-says"\n "please use quotes for multiword titles"`);    
};

// command Spotify this song
// requires artist, song name, preview, album
function spotifyThisSong(trackName){
    var trackName =process.argv[3];
    if (trackName){
        trackName = "the sign";
    };
    songRequest = trackName;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function(err, data){
            if (err) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i<5; i++) {
                    if (trackInfo[i] != undefined){
                        var spotifyResults= "Artist: "+trackInfo[i].artist[0].name + "\n" +"song: "+trackInfo[i].name +"\n"+"Preview URL: " + trackInfo[i].preview_url +"\n"+"Album: "+trackInfo[i].album.name+"\n";
                        console.log(spotifyResults);
                        console.log('   ');
                    };    
                };
            } else {
                console.log("error: " + err);
                return;
            }; /////////at 0:33 seconds!!!
        }
    )
}





// require("dotenv").config();
// var keys = require("./keys.js");
// var axios = require("axios");
// var moment = require("moment");
// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//     id: keys.spotify.id,
//     secret: keys.spotify.secret
//   });

//   var userCommand = process.argv[2]; // this is either concert-this, spotify-this, movie-this, do-what-it-say

//   var userQuery = process.argv.splice(3); 

//   switch (userCommand) {
//       case "concert-this":
//       concertSearch();
//       // "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
//       break;

//       case "spotify-this-song":
//       // function spotify-this-song;
//       break;

//       case "movie-this":
//       // function movie-this;
//       break;

//       case "do-what-it-says":
//       // function do-what-it-says;
//       break;

//   }

//   function concertSearch() {
//       axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=anythingwillwork")
//       .then(function(res){
//           console.log(res);
//       })
//   }