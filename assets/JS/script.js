// Creating buttons with user input reading from the text field

const buttonDiv = $("<div>").attr("id", "city-buttons-go"); // creating a div where I can put all the city buttons
$('#history.list-group').append(buttonDiv); // appending the new ciyt button div to existing div in DOM

let userInput = 'London';
let storedCities = [];

const codeToEmoji = {
    "01d": "☀️",
    "02d": "⛅️",
    "03d": "☁️",
    "04d": "☁️",
    "09d": "🌧️",
    "10d": "🌦️",
    "11d": "⛈️",
    "13d": "🌨️",
    "50d": "🌫️",
    "01n": "🌙",
    "02n": "☁️",
    "03n": "☁️",
    "04n": "☁️",
    "09n": "🌧️",
    "10n": "🌦️",
    "11n": "⛈️",
    "13n": "🌨️",
    "50n": "🌫️"
};

function kelvinToCelsius(kelvin) { // converting from Kelving to Celcius 
    return Math.round(kelvin - 273.15); // and rounding number to before decimal
}

function saveCity(city) {
    storedCities.push(city);
}

$("#search-button").on("click", function (event) { // and the search button is clicked

    event.preventDefault(); // stops page from reloading

    // var city = $("#userInput").val();

    let city = userInput;

    if (city !== '') {
        // Retrieve the Cities array from local storage
        let cities = localStorage.getItem("Cities");
        cities = cities ? JSON.parse(cities) : [];

        // Push the new city into the array
        cities.push(city);

        // Save the updated array back into local storage
        localStorage.setItem("Cities", JSON.stringify(cities));
   
    }


    // Retrieve the storedCities array from local storage
    storedCities = JSON.parse(localStorage.getItem("Cities")) || [];

    console.log(storedCities)


    console.log("Search button clicked!"); // checks if button click event is working

    userInput = $('#search-input').val(); // When the user types in a city search

    $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=7951fb6b203b6da5edb80b868d81e68b', function (data) {
        // Create a new HTML element to display the weather data
        var newWeatherDiv = $('<div>');
        newWeatherDiv.append('<p>' + data.name + '</p>');
        newWeatherDiv.append('<p>' + data.weather[0].description + '</p>');
        newWeatherDiv.append('<p>' + data.main.temp + '</p>');

        // Replace the existing HTML element that displays the current city weather search
        $('#today').empty(); // remove any existing content
        $('#today').append(newWeatherDiv); // add the new content
    });

    const cityButton = $("<button>").text(userInput).addClass("savedButtons").css({ "padding": '10px', "margin": '5px' }); // I want to create a button with that text content
    buttonDiv.append(cityButton); // button is appended to the button div
    $('#search-input').val(''); // and the text field is cleared
    // storedCities.push(userInput); // adding new city to array
    localStorage.setItem("Cities", JSON.stringify(cities)); // store that array in local storage

    console.log(userInput); // prints the recent text field input in the console
    console.log(storedCities);


    // nested function to retrieve information for newly input city from API

    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=7951fb6b203b6da5edb80b868d81e68b"; // creates a variable URL depending on what user types into textfield

    $.ajax({
        url: queryURL, // getting the custom URL from above
        method: "GET"
    })
        .then(function (response) { //then pulling specific information from returned object

            console.log(response); // to check what's in that object

            let cityName = $("<h2>").text(response.name); // creates a headline with the city name
            let currentDate = moment().format("dddd, MMMM Do YYYY"); // getting today's date with moment
            let weatherEmoji = codeToEmoji[response.weather[0].icon]; // grabbing the icon code and using function to convert into icon

            let temperatureKelvin = response.main.temp; // grabing temp value
            var temperatureInCelcius = kelvinToCelsius(temperatureKelvin); // and using conversion function to get celcius

            let humidity = response.main.humidity;
            let windSpeed = response.wind.speed;

            let windSpeedKPH = windSpeed * 3.6; // convert from meters per second to kilometers per hour
            windSpeedKPH = Math.round(windSpeedKPH); // round to nearest whole number

            // create HTML elements for the forecast data
            let tempInCelsiusElement = $("<p>").text("Temperature: " + temperatureInCelcius + " °C");
            let windSpeedElement = $("<p>").text("Wind speed: " + windSpeedKPH + " km/h");
            let humidityElement = $("<p>").text("Humidity: " + humidity + "%");
            let weatherEmojiElement = $("<p>").text(weatherEmoji);

            // add the forecast data to the page
            $("#today").append(currentDate);
            $("#today").append(cityName);
            $("#today").append(tempInCelsiusElement);
            $("#today").append(weatherEmojiElement);
            $("#today").append(windSpeedElement);
            $("#today").append(humidityElement);
        });


    const forecastDiv = $("<div>").attr("id", "forecast");
    $("#weather-container").append(forecastDiv);


});

$("city-buttons-go.button").on("click", function () {
    var cityName = $(this).text();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Extract the necessary data from the API response
        var temperature = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var weatherIcon = response.weather[0].icon;

        // Update the HTML with the new data
        var tempInCelsiusElement = $("<p>").text("Temperature: " + temperature + " °C");
        var humidityElement = $("<p>").text("Humidity: " + humidity + "%");
        var windSpeedElement = $("<p>").text("Wind Speed: " + windSpeed + " m/s");
        var weatherEmojiElement = $("<img>").attr("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");

        $("#today").empty();
        $("#today").append(cityName);
        $("#today").append(tempInCelsiusElement);
        $("#today").append(weatherEmojiElement);
        $("#today").append(windSpeedElement);
        $("#today").append(humidityElement);
    });
});


$('#clear-button').click(function (event) { // when the clear button is clicked

    event.preventDefault(); // stops from resetting
    console.log("Clear button clicked!"); // checks if clear button clicked

    $("#city-buttons-go").empty(); // the div that contains the city buttons is emptied
    localStorage.clear();
    storedCities = [];
});

$(document).ready(function () { // Keep the button 

    storedCities = JSON.parse(localStorage.getItem("Cities"));
    if (storedCities) {
        for (let i = 0; i < storedCities.length; i++) {
            let city = storedCities[i];
            const cityButton = $("<button>").text(city).addClass("d-flex flex-column").css({ "padding": '10px', "margin": '5px' });
            buttonDiv.append(cityButton);
        }
    }
});


// I also want to use the input with Weather API to generate a forecast
// and the current preview is cleared and replaced with the new data pulled from Weather API