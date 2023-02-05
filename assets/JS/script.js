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

$("#search-button").click(function (event, storedCities) { // and the search button is clicked
    console.log(storedCities)
    event.preventDefault(); // stops page from reloading

    console.log("Search button clicked!"); // checks if button click event is working

    userInput = $('#search-input').val(); // When the user types in a city search

    const cityButton = $("<button>").text(userInput).addClass("savedButtons").css({ "padding": '10px', "margin": '5px' }); // I want to create a button with that text content
    buttonDiv.append(cityButton); // button is appended to the button div
    $('#search-input').val(''); // and the text field is cleared
    // storedCities.push(userInput); // adding new city to array
    localStorage.setItem("Cities", JSON.stringify(storedCities)); // store that array in local storage

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


            console.log(temperatureKelvin);
            console.log(temperatureInCelcius);

            let humidity = response.main.humidity;
            let windSpeed = response.wind.speed;


            $("#today").append("  " + currentDate + "<br>");
            $("#today").append(cityName);
            $("#today").append("  " + temperatureInCelcius + "˚");
            $("#today").append("  " + weatherEmoji + "<br>");


            $("#today").append("  Humidity: " + humidity + "%" + "<br>");
            $("#today").append("  Wind Speed: " + windSpeed + "<br>");

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