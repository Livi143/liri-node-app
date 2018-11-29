require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  var userCommand = process.argv[2]; // this is either concert-this, spotify-this, movie-this, do-what-it-say

  var userQuery = process.argv.splice(3); 

  switch (userCommand) {
      case "concert-this":
      concertSearch();
      // "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
      break;

      case "spotify-this-song":
      // function spotify-this-song;
      break;

      case "movie-this":
      // function movie-this;
      break;

      case "do-what-it-says":
      // function do-what-it-says;
      break;

  }

  function concertSearch() {
      axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=anythingwillwork")
      .then(function(res){
          console.log(res);
      })
  }