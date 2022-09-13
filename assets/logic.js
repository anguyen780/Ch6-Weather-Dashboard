var searchButtonEl = $('#search-btn');
var cityInputEl = $('#city-input');
var currentForecast = $('#current-forecast');
var apiKey = '0ac60c6b4c72040fe501b13047a072a8';
var tempEl = $('#temperature');
var windEl = $('#wind');
var humEl = $('#humidity');
var forecastBox = $('#forecast-div');
var dateMoment = moment().add(1, 'day').format("MMM Do YY");


function submission(event){
    event.preventDefault();
    var cityInput = cityInputEl.val();
    cityInputEl.val('');
    var weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=imperial&appid=${apiKey}`;
    forecastBox.addClass('border border-dark')
    
    fetch(weatherApi).then(function(response){
        return response.json();
    }).then(function(results){
        var forecastIcon = results.list[0].weather[0].icon;
        var forecastImg = `http://openweathermap.org/img/wn/${forecastIcon}.png`;
        currentForecast.html(`${results.city.name} (${moment().format('L')}) <img src="${forecastImg}" alt="forecast-icon"/>`);
        var temp = results.list[0].main.temp;
        var wind = results.list[0].wind.speed;
        var humidity = results.list[0].main.humidity;
        tempEl.text(`Temp: ${temp} °F`);
        windEl.text(`Wind Speed: ${wind} MPH`);
        humEl.text(`Humidity: ${humidity} %`);
    })
}

function forecast5Day (event){
    event.preventDefault();
    var weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=imperial&appid=${apiKey}`;
    $('#5day-h2').text('5 Day Forecast')

    fetch(weatherApi).then(function(response){
        return response.json();
    }).then(function(results){
        
    })
}

searchButtonEl.on('click', submission);