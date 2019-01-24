$('#getInformation').on('click', function() {
        navigator.geolocation.getCurrentPosition(alertPosition);

function alertPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat);
    console.log(long);


    if(lat && long) {
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=2c2c9e8f8ff7dfd47bdf026e5175189d';

        $.ajax(apiUrl)
            .done(function (data) {
                console.log(data);

                $('.location').remove();
                $('.picture').remove();



                const weatherDescription = data.weather[0].description;
                const weatherPressure = data.main.pressure;
                const weatherHumidity = data.main.humidity;
                const celciusTemp = Math.round(data.main.temp - 273);
                const windDeg = data.wind.deg;
                const windSpeed = data.wind.speed;
                const city = data.name;

                const newEl = $(`
                <div>
                    <h2>${city}</h2>
                    <p>${weatherDescription} ${celciusTemp} &deg C</p>
                    <p>Pressure: ${weatherPressure}</p>
                    <p>Humidity: ${weatherHumidity}</p>
                    <p>Wind: ${windSpeed} mps ${windDeg} &deg</p>
                </div>
            `);

                $('.results').append(newEl);


                if (weatherDescription.includes('sky')) {
                    $('.sunny').removeClass('hidden')
                } else if
                (weatherDescription.includes('clouds')){
                    $('.cloudy').removeClass('hidden')
                } else if
                (weatherDescription.includes('rain')) {
                    $('.rainy').removeClass('hidden')
                } else if (weatherDescription === 'rain') {
                    $('.sun-shower').removeClass('hidden')
                } else if (weatherDescription.includes('thunderstorm')) {
                    $('.thunder-storm').removeClass('hidden')
                } else if (weatherDescription.includes('snow')){
                    $('.flurries').removeClass('hidden')
                }


            });

    }
    let current = $.now();
    let maxDate = new Date(current);
    let currentDate = maxDate.toDateString();
    $('.date').append('<p>'+ currentDate + '</p>');
}

});

