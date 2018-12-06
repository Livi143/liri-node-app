console.log('this is loaded');

// get your api creds by following: 
// 1) https://apps.twitter.com/app/new
// 2) use https:// for your urls 
// 3) then go to keys and acces tokens to get your creds for below
// 4) then you have to click the button below on that page to creat an access token 


exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

