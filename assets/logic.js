var searchButtonEl = $('#search-btn');
var cityInputEl = $('#city-input');
var currentForecast = $('#current-forecast');
var apiKey = '0ac60c6b4c72040fe501b13047a072a8';
var tempEl = $('#temperature');
var windEl = $('#wind');
var humEl = $('#humidity');
var forecastBox = $('#forecast-div');
var cityHistory = $('#city-history');



function submission(event){
    event.preventDefault();
    var cityInput = cityInputEl.val();
    var savedCity = {
        city: cityInputEl.val()
    }
    var cityArray = JSON.parse(localStorage.getItem('savedCity')) || [];
    cityArray.push(savedCity);
    localStorage.setItem('savedCity', JSON.stringify(cityArray));

    for (let i = 0; i < cityArray.length; i++) {
        var dateButton = $('<button>').attr('class','btn btn-dark');
        var objectNum = Object.keys(cityArray);
        dateButton.text(`${cityArray[i]}`);
        cityHistory.append(dateButton);
        
        

        
    }
    
    


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
    forecast5Day();
}

function forecast5Day (){
    var cityInput = cityInputEl.val();
    cityInputEl.val('');
    var weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=imperial&appid=${apiKey}`;
    $('#5day-h2').text('5 Day Forecast');

    fetch(weatherApi).then(function(response){
        return response.json();
    }).then(function(results){
        forecastArray = [];
        forecastArray.push(results.list[6]);
        forecastArray.push(results.list[14]);
        forecastArray.push(results.list[22]);
        forecastArray.push(results.list[30]);
        forecastArray.push(results.list[38]);
        
        for (let i = 0; i < forecastArray.length; i++) {
            var forecastDayIcon = forecastArray[i].weather[0].icon;
            var forecastDayImg = `http://openweathermap.org/img/wn/${forecastDayIcon}.png`;
            var dayArray = forecastArray[i].dt_txt.split(' ')[0].split('-');
            var dayTxt = $('<h5>').text(`${dayArray[1]}/${dayArray[2]}/${dayArray[0]}`);
            var temp5Day = $('<p>').text(`Temp: ${forecastArray[i].main.temp} °F`);
            var wind5Day = $('<p>').text(`Wind Speed: ${forecastArray[i].wind.speed} MPH`);
            var humidity5Day = $('<p>').text(`Humidity: ${forecastArray[i].main.humidity} %`);
            $('#card-display').attr('class', 'card custom-card col-8');
            var iconImg = $('<img>').attr('src', forecastDayImg);
            var weatherDisplay = $('#card-display');
            var weatherCard = $('<div>').attr('class','card-body bg-dark text-white');
            var weatherContainer = $('<div>').attr('class','card');
            weatherContainer.attr('style','width: 18rem');
            weatherCard.append(dayTxt, iconImg, temp5Day, wind5Day, humidity5Day);
            weatherContainer.append(weatherCard);
            weatherDisplay.append(weatherContainer);
           
            
        }
    })
    // saveCity();
}

function saveCity (){
    
    
}

searchButtonEl.on('click', submission);