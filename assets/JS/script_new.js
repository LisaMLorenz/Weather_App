let searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];


// declare a function to fetch the weather information for a given city
function getWeatherData(city) {
    // use the OpenWeather API to fetch weather data for the city
    let apiKey = '7951fb6b203b6da5edb80b868d81e68b';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;



    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('City not found');
            }
        })
        .then(function (data) {
            // create variables to store the weather data
            let city = data.name;
            let temp = data.main.temp;
            let windSpeed = data.wind.speed;
            let humidity = data.main.humidity;
            let weatherIcon = data.weather[0].icon;

            // create an HTML string to display the weather information
            let weatherHtml = `
          <h2>${city}</h2>
          <p>Temperature: ${temp}&deg;C</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
          <p>Humidity: ${humidity}%</p>
          <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon" />
        `;

            // display the weather information in the "today" div
            document.getElementById('today').innerHTML = weatherHtml;
        })
        .catch(function (error) {
            // display an error message if the city is not found
            document.getElementById('today').innerHTML = `<p>${error.message}</p>`;
        });
}

// add an event listener to the search button to fetch the weather information for the input city
document.getElementById('search-button').addEventListener('click', function (event) {
    event.preventDefault();
    let city = document.getElementById('search-input').value.trim();
    if (city) {
        getWeatherData(city);
        searchedCities.push(city);
        renderButtons();
        localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
        document.getElementById('search-input').value = ""; // clear search input field
    }
});


function renderButtons() {
    $("#history").empty();
    for (var i = 0; i < searchedCities.length; i++) {
        var cityBtn = $("<button>");
        cityBtn.addClass("btn btn-secondary city-btn");
        cityBtn.attr("data-name", searchedCities[i]);
        cityBtn.text(searchedCities[i]);
        $("#history").append(cityBtn);
    }
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}



$(document).on("click", ".city-btn", function () {
    var cityName = $(this).attr("data-name");
    getWeatherData(cityName);
});

// check if there are any searched cities stored in local storage
if (localStorage.getItem("searchedCities")) {
    // get the searched cities from local storage and parse the JSON string
    searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
    // render the buttons for each searched city
    renderButtons();
}

document.getElementById('clear-button').addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    searchedCities = [];
    renderButtons();
});
