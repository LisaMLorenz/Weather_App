queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=7951fb6b203b6da5edb80b868d81e68b"; // creates a variable URL depending on what user types into textfield

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            let cityName = $("<h2>").response.name;
            let currentDate = moment();
            let weatherIcon = $("<img>");

            let temperatureKelvin = response.main.temperature;
            let temperature = temperatureKelvin - 273.15;

            let humidity = response.main.humidity;
            let windSpeed = response.wind.speed;


            $("#today").prepend(cityName);
            $("#today").prepend(currentDate);
            $("#today").prepend(weatherIcon);
            $("#today").prepend(temperature + "˚");
            $("#today").prepend(humidity);
            $("#today").prepend(windSpeed + " km/ph");
            
        });