const fetchButton = document.getElementById('search-button');


function getForecast () {
   // preventDefault()
    console.log('button pressed')
   
    //const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=aedff6b19ebb0a704cc38341604b8fc8&units=imperial"
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=aedff6b19ebb0a704cc38341604b8fc8&units=imperial"
    fetch(weatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      console.log(data);
    }
)
}

fetchButton.addEventListener('click', getForecast);