const settings = {
  async: true,
  crossDomain: true,
  url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=6&api_key=dad7323719f43c33222dc369fa6a71c1&format=json",
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "x-rapidapi-key": "186eefd54dmsh9922fd60d7a98b7p17409fjsn4afd81646443",
    "x-rapidapi-host": "LastFmdimashirokovV1.p.rapidapi.com",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
  
  for (var i=0; i<response.artists.artist.length; i++) {
    $("#top-artists-cards").append(`
        <div class="thumbnail-rounded">
            <a href="artists/apdhillon.html">
                <img src=${response.artists.artist[i].image[1]}>
                <button type="submit" class="icon-play" onclick="showFooter()"><i class="fas fa-play"></i></button>
                <p>${response.artists.artist[i].name}</p>
            </a>
        </div>     
    `);
  }
});
