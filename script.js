

//This function collects all the info from the weather APIs to display on the page
var forecastdisplay;

$(".search").on("click", function() {
    var subject = $(".City").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + subject + "&appid=1df9bab5b202b06a0b1d5b5d4cd0fb87";
   

//This first ajax request collects current weather data and converts info into what we want to display.
    $.ajax({
        url: queryURL,
        method: "GET",
        statusCode: {
            404: function() {
              return;
            }
          }    
    }).then(function(response){
        console.log(response);
        
        $(".current-city").text(response.name + " " + moment().format('MM DD YY'));
        var currentTemp = response.main.temp * (9/5) - 459.67;
        $(".current-temp").text("Temperature: " + currentTemp.toFixed(1) + " °F");
        $(".current-hum").text("Humidity: " + response.main.humidity + "%");
        $(".current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    })

});

