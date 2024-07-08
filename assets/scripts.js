const fetchButton = document.getElementById('search-button');
let searchTermEl = document.getElementById('search-value');


function getForecast () {
   // preventDefault()
   let searchTerm = searchTermEl.value
   
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=aedff6b19ebb0a704cc38341604b8fc8&units=imperial"
    fetch(weatherUrl)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
      console.log(data);
    })

    const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=aedff6b19ebb0a704cc38341604b8fc8&units=imperial"
    fetch(forecastUrl)
    .then(function (response) {
      return response.json();
  }).then(function (data) {
    console.log(data);
  })

    updateHistory();
    displayWeather;
    //displayForecast;
  }

  function updateHistory() {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    let searchTerm = searchTermEl.value
    console.log(history);
     history.push(searchTerm);
     localStorage.setItem('history', JSON.stringify(history));
  }

function displayWeather () {

}

function displayForecast () {

}

fetchButton.addEventListener('click', getForecast);