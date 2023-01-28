// Creating buttons with user input reading from the text field

const buttonDiv = $("<div>").attr("id", "city-buttons-go"); // creating a div where I can put all the city buttons
$('#history.list-group').append(buttonDiv); // appending the new ciyt button div to existing div in DOM
var userInput = ('London');
var userSearch = [];
let storedCities = [];

$("#search-button").click(function(event){ // and the search button is clicked
    event.preventDefault(); // stops page from reloading

    console.log("Search button clicked!"); // checks if button click event is working

    let userInput = $('#search-input').val(); // When the user types in a city search
    const cityButton = $("<button>").text(userInput).addClass("d-flex flex-column").css({"padding":'10px', "margin": '5px'}); // I want to create a button with that text content
    buttonDiv.append(cityButton); // button is appended to the button div
    $('#search-input').val(''); // and the text field is cleared
    storedCities.push(userInput);
    localStorage.setItem("Cities", JSON.stringify(storedCities));

    console.log(userInput); // prints the recent text field input in the console
    console.log(storedCities);
    
});

console.log(storedCities);

$(document).ready(function(){
    
    storedCities = JSON.parse(localStorage.getItem("Cities"));
if(storedCities){
  for (let i = 0; i < storedCities.length; i++) {
    let city = storedCities[i];
    const cityButton = $("<button>").text(city).addClass("d-flex flex-column").css({"padding":'10px', "margin": '5px'});
    buttonDiv.append(cityButton);
  }
}

    console.log(storedCities);

  });

$('#clear-button').click(function(event){ // when the clear button is clicked

    event.preventDefault(); // stops from resetting
    console.log("Clear button clicked!"); // checks if clear button clicked

    $("#city-buttons-go").empty(); // the div that contains the city buttons is emptied
    localStorage.clear();
    storedCities = [];
});


var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=7951fb6b203b6da5edb80b868d81e68b"; // creates a variable URL depending on what user types into textfield
var APIKey = '7951fb6b203b6da5edb80b868d81e68b'; // setting API key to link to OpenWeatherMap

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
        });




    
  

    // I also want to use the input with Weather API to generate a forecast

    

// Keep the button 
// Each time the user types in a new city
// a new button is created
// and the current preview is cleared and replaced with the new data pulled from Weather API
