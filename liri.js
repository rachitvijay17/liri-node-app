var dotenv = require("dotenv").config();

var moment = require("moment");

var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require("node-spotify-api");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var method = process.argv[2];

var input = process.argv[3];
//console.log(input);

var output = [];

function moviethis(){

    if(process.argv.length < 4 && process.argv.length>2){
        input = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function(response) {

            output = [
            "**************************************************************************************",
            "Title of the movie                     : " + response.data.Title,
            "Year the movie came out                : " + response.data.Year,
            "IMDB Rating of the movie               : " + response.data.imdbRating,
            "Rotten Tomatoes Rating of the movie    : " + response.data.Rated,
            "Country where the movie was produced   : " + response.data.Country,
            "Language of the movie                  : " + response.data.Language,
            "Plot of the movie                      : " + response.data.Plot,
            "Actors in the movie                    : " + response.data.Actors,
            "**************************************************************************************"
            ].join("\n\n");

            console.log(output);

            fs.appendFile("log.txt", output, function(err) {
                if (err) throw err;
               
              });
        }
      );
};

function concert_this(){
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    console.log(queryUrl);

    axios.get(queryUrl).then(
        function(response){

            for (var i = 0; i<=response.data.length; i++){
                var date = response.data[i].datetime;
                output = [
                "********************************************************************************************",
                "Name of the venue          : "+response.data[i].venue.name,
                "Venue location             : "+response.data[i].venue.city+", "+response.data[0].venue.country,
                "Date of the Event          : "+moment(date).format("MM/DD/YYYY"),
                "********************************************************************************************"
                ].join("\n\n");

                console.log(output);

                fs.appendFile("log.txt", output, function(err) {
                    if (err) throw err;
                   
                  });

            }
        }
    )
};


function spotifythis(){
    spotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      
      //debugger;  

      for (var i = 0; i< data.tracks.items.length; i++){

            output = [

            "************************************************************************************",
            "Artist(s)                              : "+data.tracks.items[i].artists[0].name,
            "The song's name                        : "+data.tracks.items[i].name,
            "A preview link of the song from Spotify: "+data.tracks.items[i].preview_url,
            "The album that the song is from        : "+data.tracks.items[i].album.name,
            "************************************************************************************"
            ].join("\n\n");

            console.log(output);

                fs.appendFile("log.txt", output, function(err) {
                    if (err) throw err;
                   
                  });

      }

      });
}


if (process.argv.length<3){

fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
        return console.log(error);
      }

      var dataArr = data.split(",");
      console.log("**************************************************************************************");
      console.log("The data array form the random.txt file  : "+dataArr);

      fs_method = dataArr[0];
      fs_input = dataArr[1];

      console.log("The method is called from the file is    : "+fs_method);
      console.log("The input for the method is              : "+fs_input);
      console.log("**************************************************************************************");

    if(fs_method == 'movie-this'){
        input = fs_input;
        moviethis();
    }

    if(fs_method == 'concert-this'){
        input = fs_input;
        concert_this();
    }

    if(fs_method == 'spotify-this-song'){
        input = fs_input;
        spotifythis();
    }
        

});

}else if (method == 'movie-this'){
    moviethis();
}else if (method == 'concert-this'){
    concert_this();   
}else if (method == 'spotify-this-song'){
    spotifythis();
}else {
    console.log("Not a Valid Entry!");
}




