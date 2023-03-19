let searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
let units = 'metric';


// declare a function to fetch the weather information for a given city
function getWeatherData(city) {
    // use the OpenWeather API to fetch weather data for the city
    let apiKey = '7951fb6b203b6da5edb80b868d81e68b';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json(); //receiving a JSON for the searched City
            } else {
                throw new Error('City not found');
            }
        })

        .then(function (data) { // receiving all the data for the call from the API
            // create variables to store the weather data
            let city = data.name; // checking the returned data to access the information from the returned object
            let temp = data.main.temp;
            let windSpeed = data.wind.speed;
            let humidity = data.main.humidity;
            let weatherIcon = data.weather[0].icon;
            let lat = data.coord.lat; // need the latitude and longitude and a separate call to get the UV data
            let lon = data.coord.lon;
            let uvIndex = 0; // for now setting this to zero to initialize the variable

            function getUVIndex(lat, lon) { //the other API call to get the uv Index info
                let apiKey = '7951fb6b203b6da5edb80b868d81e68b';
                let apiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

                fetch(apiUrl)
                    .then(function (response) {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Unable to fetch UV index');
                        }
                    })
                    .then(function (data) {
                        uvIndex = data.value;
                        // do something with the UV index data

                        // create an HTML string to display the weather information
                        let weatherHtml = `
            <h2><span>${city}</span>  <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon" /> </h2> 
            <p>Temperature: ${temp}&deg;C</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Humidity: ${humidity}%</p>
            <p>UV Index: ${uvIndex}%</p>
          `;

                        document.getElementById('today').innerHTML = weatherHtml; //rendering the info for the app

                    })

                    .catch(function (error) {
                        console.log(error);
                    });
            }

            getUVIndex(lat, lon);


            // check if the searched city already exists in the array
            let index = searchedCities.indexOf(city);

            if (index === -1) {
                searchedCities.push(city);
                localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
            }
            renderButtons();
            fetchForecast(city);
        })
        .catch(function (error) {
            $('#error-modal').modal('show'); // display an error modal if the city is not found
            console.log(error);

        });

    function fetchForecast(city) {
        let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(function (data) {
                let dailyForecastData = data.list.filter(function (forecast) {
                    return forecast.dt_txt.includes("12:00:00"); // get the forecast data for 12:00:00 each day
                });

                let forecastHtml = '';
                dailyForecastData.forEach(function (forecast) {
                    let forecastDate = moment(forecast.dt_txt).format('ddd D/MM');
                    let forecastIconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
                    let forecastTemp = "Temp: " + Math.round(forecast.main.temp);
                    let forecastWind = "Wind: " + forecast.wind.speed + "m/s";
                    let forecastHumidity = "Humidity: " + forecast.main.humidity + "%";

                    // console.log(forecast);

                    forecastHtml += `
          <div class="col-md-2 col-6 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"><span>${forecastDate}</span><img src="${forecastIconUrl}" alt="${forecast.weather[0].description}" /></h5>
                <p class="card-text">${forecastTemp} ${units === 'metric' ? '°C' : '°F'}</p>
                <p class="card-text">${forecastWind}</p>
                <p class="card-text">${forecastHumidity}</p>

              </div>
            </div>
          </div>
        `;
                });

                document.getElementById('forecast').innerHTML = forecastHtml;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

// add an event listener to the search button to fetch the weather information for the input city
document.getElementById('search-button').addEventListener('click', function (event) {
    event.preventDefault();
    let city = document.getElementById('search-input').value.trim();
    if (city) {
        getWeatherData(city);
        document.getElementById('search-input').value = "";
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
