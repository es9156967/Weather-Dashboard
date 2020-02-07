$(".current-box").hide();
$(".forecast-banner").hide();

//This function collects all the info from the weather APIs to display on the page
var forecastdisplay;

$(".search").on("click", function() {
    var subject = $(".City").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + subject + "&appid=1df9bab5b202b06a0b1d5b5d4cd0fb87";
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + subject + "&appid=1df9bab5b202b06a0b1d5b5d4cd0fb87";
    var lat;
    var lon;
    
//This first ajax request collects current weather data and converts info into what we want to display.
    $.ajax({
        url: queryURL,
        method: "GET",

        }).then(function(response){
        console.log(response);
        $(".prev-list").prepend("<button>" + subject + "</button>");
        $(".current-box").show();
        $(".forecast-banner").show();
        $(".current-city").text(response.name + " " + moment().format('MMMM Do YYYY'));
        var currentTemp = response.main.temp * (9/5) - 459.67;
        $(".current-temp").text("Temperature: " + currentTemp.toFixed(1) + " °F");
        $(".current-hum").text("Humidity: " + response.main.humidity + "%");
        $(".current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $(".icon").attr('src', iconurl)
        lat = response.coord.lat;
        lon = response.coord.lon;



        //REDEFINING THE QUERY URL FOR THIS AJAX CALL AND ADDING THE LATITUDE AND LONGITUDE VALUES
        queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?&appid=3c34658c8e0e9fdb71064b81293a3704&lat=" + lat + "&lon=" + lon;

        //This is the ajax call that will grab the UV INDEX CALL FOR THE ICTY
        $.ajax({
            url: queryURL,
            method: "Get"
    
        }).then(function(response){
            $(".current-uv").text("UV Index: " + response[0].value);
        })

    })
    //This ajax request collects weather data for the next 5 days (specifically it is grabbing the stays from noon, as opposed to every few hours)
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response){
        var forecastTimes = response.list;
        for (i = 0; i < forecastTimes.length; i++) {
            if (forecastTimes[i].dt_txt[12] === "2") {
                var forecastdate = forecastTimes[i].dt_txt;
                var forecastdatedisplay = forecastdate.charAt(6) + "/" + forecastdate.charAt(8) + forecastdate.charAt(9) +
                "/" + forecastdate.charAt(0) + forecastdate.charAt(1) + forecastdate.charAt(2) + forecastdate.charAt(3);
                var forecasticon = forecastTimes[i].weather[0].icon;
                var forecasticonurl = "http://openweathermap.org/img/w/" + forecasticon + ".png";
                var forecastTemp = forecastTimes[i].main.temp * (9/5) - 459.67;
                var forecastHum = forecastTimes[i].main.humidity;
                if (forecastdisplay === false || forecastdisplay === undefined) {
                    $(".forecast-list").append("<div class='my-3 pb-3 col-md-2 col-lg-2 forecast-day'>" +
                    "<h5>" + forecastdatedisplay + "<h5>" +
                    "<img class='ficon' src=" + forecasticonurl + " alt='Weather icon'>" + 
                    "<div>Temp: " + forecastTemp.toFixed(1) + " °F" + 
                    "</div><div>Humidity: " + forecastHum + 
                    "%</div></div></div>");
                } 
            }
        }
        forecastdisplay = true;
    })
});

