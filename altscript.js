
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            let cityName = $("<h2>").response.name;
            let currentDate = moment();
            let weatherIcon = $("<img>");
            let temperature = response.main.temperature;

            $("#today").prepend(cityName);
            $("#today").prepend(currentDate);
            $("#today").prepend(weatherIcon);
            $("#today").prepend(temperature);
            $("#today").prepend(humidity);
            $("#today").prepend(windSpeed);
            
        });