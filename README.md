# Weather_App
Creating a weather app that allows a user to search for cities and add display their current weather and forecast. The search is then saved as a button and can be retrieved at a later point.


# Description
Using Javascript to dynamically create new components of the application using an API to retrieve up-to-date information about the weather. 

- I'm writing a function that reads the user input and creates buttons for each city
- the submit click also triggers displaying current weather information of that city
- buttons are saved in local storage and still show when the user shuts and reopens their browser
- when the newly created city buttons are clicked they display the relevant city information again

## CSS
This exercise didn't require CSS modification, but I added some to style the header and buttons.

## HTML
Manually added a link to Google Fonts.

## JavaScript
Used MomentJS to access current time stamp, retrieve information from OpenWeather API and to dynamically create application components such as new DIVs.

## Installation
N/A

## Usage
https://lisamlorenz.github.io/Weather_App/


### Task: This is what the app should do:


* Create a weather dashboard with form inputs.

* When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.

* When a user views the current weather conditions for that city they are presented with:

- The city name
- The date
- An icon representation of weather conditions
- The temperature
- The humidity
- The wind speed

* When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:

- The date
- An icon representation of weather conditions
- The temperature
- The humidity

* When a user clicks on a city in the search history they are again presented with current and future conditions for that city.


### Screenshot
[Click here to see the deployed screenshot](./assets/images/weather_dashboard_screengrab.png)
<img width="710" alt="weather_dashboard_screengrab" src="https://user-images.githubusercontent.com/116456417/215340734-73ab4252-841b-4ae3-b178-66dfd0473f2d.png">




## Credits
I tried out ChatGPT to make this work. It helped a lot but still puzzled about how to structure functions right and place new information within the existing site.

## License
MIT License
