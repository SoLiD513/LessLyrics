var CLIENTID =
  "";
var CLIENTSECRET =
  "";
var accessToken =
  "";
var API = "https://api.genius.com/search";
var APISong = "https://api.genius.com/songs/";
var songID = "4";
var maxSong = 2471960;
//Max song is 489579 for a fairly safe number. But 2 million songs

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//https://api.genius.com/search?q=Kendrick%20Lamar
var xhr = new XMLHttpRequest(); //XML HTTP Request
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200 || xhr.status === 304) {
      // Success! Do stuff with data.
      // Brings in all the data
      // console.log(xhr.responseText);
    }
  }
};
xhr.open("GET", APISong + songID + accessToken, false);
//xhr.open("GET", API+accessToken+ '&q=Kendrick%20Lamar', false);

xhr.send();
// xhr status we want 200 to show up
// console.log(xhr.status);
// console.log(xhr.statusText);
demo = xhr.response;

var json = JSON.parse(demo);
var song = json["response"]["song"];
console.log(song)

function newRandomSong() {
  songID = getRandomInt(1, maxSong);
  randomSong();
}

function randomSong() {
  xhr.open("GET", APISong + songID + accessToken, false);
  xhr.send();
  demo = xhr.response;

  while (xhr.status === 404) {
    //Checks if the Random Song Exists
    songID = getRandomInt(1, maxSong);
    xhr.open("GET", APISong + songID + accessToken, false);
    xhr.send();
    demo = xhr.response;
  }

  json = JSON.parse(demo);
  song = json["response"]["song"];
  document.getElementById("songImage").innerHTML =
    '<img src="' +
    song["song_art_image_url"] +
    '"alt="Some Awesome Album Art" style="width:200px;height:200px;">';
  // I made these pixel values since I'd rather have overlap on a small screen than the image scaled too small

  //document.getElementById("song").innerHTML = "SONG: <a href="+song['url']+" >"+song['title'].toUpperCase()+"</a>";
  document.getElementById("song").innerHTML =
    'SONG: <a target="_blank" href=' +
    song["url"] +
    " >" +
    song["title"].toUpperCase() +
    "</a>";

  document.getElementById("artist").innerHTML =
    'ARTIST: <a target="_blank"  href=' +
    song["primary_artist"]["url"] +
    ">" +
    song["primary_artist"]["name"].toUpperCase() +
    "</a>";
  document.getElementById("releaseDate").innerHTML =
    "RELEASE DATE: " + song["release_date"];
}
// function tweetSong() {
//   window.open(
//     'https://twitter.com/intent/tweet?hashtags=songs&text=Found a cool song today. "' +
//       song["title"] +
//       '" by ' +
//       song["primary_artist"]["name"]
//   );
// }

//GETTING STARTED //
$(document).ready(function() {
  randomSong(); //Using this instead of newRandomSong, because I want to start with the same song every time
});
