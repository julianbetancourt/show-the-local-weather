//Request to get lat, long, countryCode and cityName
$.getJSON('http://ip-api.com/json', function (ip) {
  var lat = ip.lat;
  var long = ip.lon;
  var countryCode = ip.countryCode;
  var city = ip.city;
  var desc;
  var numb;
  var unit;
  var wID;

  //Request to get temperature number, weatherID, unit and description
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long +
            '&APPID=da362a8aa3d1448a36245341e0d8a196', function (w) {

    //update vars based on weather request
    desc = w.weather[0].description;
    numb = w.main.temp;
    unit = 'K';
    wID = w.weather[0].id;

    //Transform K or C to F
    function getF(n) {
      if (unit === 'K') {
        numb = n * (9/5) - 459.67;
      } else if(unit === 'C') {
        numb = n * (9/5) + 32;
      }
      return Math.round(numb);
    }

    //Transform K or F to C
    function getC(n) {
      if (unit === 'K') {
        numb = n - 273.15;
      } else if(unit === 'F') {
        numb = (n - 32) * (5/9);
      }
      return Math.round(numb);
    }

    //update city DOM and if city.length > 9 fix .city styles
    function getCity(c) {
      if (c.length > 9) {
        $('.city').addClass('fixed-city').text(c);
      } else {
        $('.city').text(c);
      }
    }

    //Update number and unit DOM based on location
    //Toggle unit
    function updateUnit() {
      if (countryCode === 'US' || countryCode === 'BS' || countryCode === 'BZ' || countryCode === 'KY' || countryCode === 'PW') {
        $('.number').text(getF(numb));
        unit = 'F';
        $('.unit span').text('ºF');
      } else {
        $('.number').text(getC(numb));
        unit = 'C';
        $('.unit span').text('ºC');
      }
    }

    //update icon class based on weatherID
    function getIcon(wID) {
      if (wID >= 200 && wID <= 232) {
        $('.weather-icon').addClass('wi-thunderstorm');
      } else if (wID >= 300 && wID <= 321) {
        $('.weather-icon').addClass('wi-raindrops');
      } else if(wID >= 500 && wID <= 531) {
        $('.weather-icon').addClass('wi-rain');
      } else if (wID >= 600 && wID <= 622) {
        $('.weather-icon').addClass('wi-snowflake-cold');
      } else if (wID >= 701 && wID <= 781) {
        $('.weather-icon').addClass('wi-fog');
      } else if (wID === 800) {
        $('.weather-icon').addClass('wi-day-sunny');
      } else if (wID >= 801 && wID <= 804) {
        $('.weather-icon').addClass('wi-cloudy');
      } else if (wID === 900) {
        $('.weather-icon').addClass('wi-tornado');
      } else if (wID === 901) {
        $('.weather-icon').addClass('wi-storm-showers');
      } else if (wID === 902) {
        $('.weather-icon').addClass('wi-hurricane');
      } else if (wID === 903) {
        $('.weather-icon').addClass('wi-strong-wind');
      } else if (wID === 904) {
        $('.weather-icon').addClass('wi-hot');
      } else if (wID === 905) {
        $('.weather-icon').addClass('wi-cloudy-windy');
      } else if (wID === 906) {
        $('.weather-icon').addClass('wi-hail');
      }
    }

    //Add class to body's background based on weatherID
    function getBackground(wID) {
      if (wID >= 200 && wID <= 232) {
        $('body').addClass('storm');
      } else if (wID >= 300 && wID <= 321) {
        $('body').addClass('raindrop');
      } else if(wID >= 500 && wID <= 531) {
        $('body').addClass('rain');
      } else if (wID >= 600 && wID <= 622) {
        $('body').addClass('snow');
      } else if (wID >= 701 && wID <= 781) {
        $('body').addClass('mist');
      } else if (wID === 800) {
        $('body').addClass('sunny');
      } else if (wID >= 801 && wID <= 804) {
        $('body').addClass('clouds');
      } else if (wID === 900) {
        $('body').addClass('tornado');
      } else if (wID === 901) {
        $('body').addClass('storm');
      } else if (wID === 902) {
        $('body').addClass('storm');
      } else if (wID === 903) {
        $('body').addClass('clouds');
      } else if (wID === 904) {
        $('body').addClass('sunny');
      } else if (wID === 906) {
        $('body').addClass('rain');
      }
    }

    //Toggle units on click
    $('.unit').on('click', function () {
      if (unit === 'C') {
        $('.unit span').text('ºF');
        $('.number').text(getF(numb));
        unit = 'F';
      } else if (unit === 'F') {
        $('.unit span').text('ºC');
        $('.number').text(getC(numb));
        unit = 'C';
      }
    });

    //Update .description DOM
    $('.desc span').text(desc);

    //Call functions
    getCity(city);
    updateUnit();
    getIcon(wID);
    getBackground(wID);
  });

});
