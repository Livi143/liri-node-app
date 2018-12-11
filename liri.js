require("dotenv").config();

var keys = require('./keys.js');


var request = require('request');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var fs = require("fs");



// where does this go and how?
// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });



// var getArtistName = function (artist) {
//     return artist.name;
// };

var getMeSpotify = function (songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            //console.log('artist(s): ' + songs[i].artists.map(getArtistsNames));
            console.log(songs[i].album.artist);
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("-----------------");
        }
    });
};

//OMDB Movie - command: movie-this
function getMovie(functionData) {
    // OMDB Movie - this MOVIE base code is from class files, I have modified for more data and assigned parse.body to a Var
    var movieName = functionData;
    // Then run a request to the OMDB API with the movie specified

    //Response if user does not type in a movie title
    if (!movieName) {
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            // If the request is successful = 200
            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);

                //Simultaneously output to console and log.txt via NPM simple-node-logger
                console.log('================ Movie Info ================');
                console.log("Title: " + body.Title);
                console.log("Release Year: " + body.Year);
                console.log("IMdB Rating: " + body.imdbRating);
                console.log("Country: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);
                console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
                console.log("Rotten Tomatoes URL: " + body.tomatoURL);
                console.log('==================THE END=================');

            } else {
                //else - throw error
                console.log("Error occurred.")
            }
        });
    }
}


function concertSearch(bandName) {
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=anythingwillwork")
        .then(function (res) {
            console.log(res.data);
            // how to get to the data you want
            for (var i = 0; i<res.data.length; i++){
                console.log(res.data[i].venue.name, res.data[i].datetime2, res.data[i].venue.city);
            }
        })
}

function doWhat() {
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error);
        console.log(data.toString());
        //split text with comma delimiter
        var cmds = data.toString().split(',');
    });
}

var getMeMovie = function (movieName) {
    // request omdb stuff here ???
}

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'movie-this':
            getMovie(functionData);
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case "concert-this":
            // name of venue, location, date
            concertSearch(functionData);
            break;
        case "do-what-it-says":
            doWhat();
            break;

        default: console.log("Liri doesn't know that");
    }
};

pick(process.argv[2], process.argv[3]);


// switch (userCommand) {
//     case "concert-this":

//     // "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
//     break;




// require("dotenv").config();

// //vars
// var keys = require("./keys.js");
// var fs = require("fs");
// var request = require("request");
// //var Twitter = require("twitter");
// //var Spotify = require('spotify-web-api-node');
// var Spotify = require('node-spotify-api');
// //creates log.txt file
// var filename = './log.txt';
// //NPM module used to write output to console and log.txt simulatneously
// var log = require('simple-node-logger').createSimpleFileLogger(filename);
// log.setLevel('all');

// //argv[2] chooses users actions; argv[3] is input parameter, ie; movie title
// var userCommand = process.argv[2];
// var secondCommand = process.argv[3];

// //concatenate multiple words in 2nd user argument
// for (var i = 4; i < process.argv.length; i++) {
//     secondCommand += '+' + process.argv[i];
// }

// // Fetch Spotify Keys
// var spotify = new Spotify(keys.spotify);

// // Writes to the log.txt file
// var getArtistNames = function (artist) {
//     return artist.name;
// };

// // Function for running a Spotify search - Command is spotify-this-song
// var getSpotify = function (songName) {
//     if (songName === undefined) {
//         songName = "What's my age again";
//     }

//     spotify.search(
//         {
//             type: "track",
//             query: userCommand
//         },
//         function (err, data) {
//             if (err) {
//                 console.log("Error occurred: " + err);
//                 return;
//             }

//             var songs = data.tracks.items;

//             for (var i = 0; i < songs.length; i++) {
//                 console.log(i);
//                 console.log("artist(s): " + songs[i].artists.map(getArtistNames));
//                 console.log("song name: " + songs[i].name);
//                 console.log("preview song: " + songs[i].preview_url);
//                 console.log("album: " + songs[i].album.name);
//                 console.log("-----------------------------------");
//             }
//         }
//     );
// };

// //Switch command
// function mySwitch(userCommand) {

//     //choose which statement (userCommand) to switch to and execute
//     switch (userCommand) {

//         case "my-tweets":
//             getTweets();
//             break;

//         case "spotify-this-song":
//             getSpotify();
//             break;

//         case "movie-this":
//             getMovie();
//             break;

//         case "do-what-it-says":
//             doWhat();
//             break;
//     }

//Twitter - command: my-tweets
// function getTweets() {
//     //Fetch Twitter Keys
//     var client = new Twitter(keys.twitter);
//     //Set my account to pull Tweets from
//     var screenName = { screen_name: 'captnwalker' };
//     //GET tweets
//     client.get('statuses/user_timeline', screenName, function (error, tweets, response) {
//         //throw error
//         if (error) throw error;

//         //Loop and Log first 20 tweets
//         for (var i = 0; i < tweets.length; i++) {
//             var date = tweets[i].created_at;
//             console.log("@captnwalker: " + tweets[i].text + " Created At: " + date.substring(0, 19));
//             //seperator
//             console.log("-----------------------");
//         }
//     });
// }




//Function for command do-what-it-says; reads and splits random.txt file
//command: do-what-it-says

























// // using .env to hide API keys
// require("dotenv").config();

// // project variables
// var keys = require("./keys.js");
// var fs = required("fs");
// var Spotify = required("node-spotify-api");
// var Spotify = new Spotify(keys.spotify);
// var request = require("request");
// var movieName = process.argv[3];
// var liriReturn = process.argv[2];
// var bandsInTown = require("bandsInTown");
// var client = new bandsInTown(keys.bandsInTown);

// // "switch-board"
// switch (liriReturn) {
//     case "spotify-this-song":
//         spotifyThisSong();
//         break;

//     case "movie-this": 
//         movieThis();
//         break;

//     case "do-what-it-says":
//         doWhatItSays();
//         break;

//     // instructions for first-time user in command line
//     default: console.log(`\n type any command after "node liri.js:\n "spotify-this-song" (and any song title)\n "movie-this" (and any movie title)\n "do-what-it-says"\n "please use quotes for multiword titles"`);    
// };

// // command Spotify this song
// // requires artist, song name, preview, album
// function spotifyThisSong(trackName){
//     var trackName =process.argv[3];
//     if (trackName){
//         trackName = "the sign";
//     };
//     songRequest = trackName;
//     spotify.search({
//         type: "track",
//         query: songRequest
//     },
//         function(err, data){
//             if (err) {
//                 var trackInfo = data.tracks.items;
//                 for (var i = 0; i<5; i++) {
//                     if (trackInfo[i] != undefined){
//                         var spotifyResults= "Artist: "+trackInfo[i].artist[0].name + "\n" +"song: "+trackInfo[i].name +"\n"+"Preview URL: " + trackInfo[i].preview_url +"\n"+"Album: "+trackInfo[i].album.name+"\n";
//                         console.log(spotifyResults);
//                         console.log('   ');
//                     };    
//                 };
//             } else {
//                 console.log("error: " + err);
//                 return;
//             }; /////////at 0:33 seconds!!!
//         }
//     )
// }





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

