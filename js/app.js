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
  var icon;
  var icons = {};

  //Request to get temperature number, weatherID, iconID, unit and description
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long +
            '&APPID=da362a8aa3d1448a36245341e0d8a196', function (w) {

    //update vars based on weather request
    desc = w.weather[0].description;
    numb = w.main.temp;
    unit = 'K';
    wID = w.weather[0].id;
    icon = w.weather[0].icon;

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

    //replace default icon with icon from https://erikflowers.github.io/weather-icons/
    function getIcon() {

      icons = {
        '01d': 'wi-day-sunny',
        '01n': 'wi-night-clear',
        '02d': 'wi-day-cloudy',
        '02n': 'wi-night-cloudy',
        '03d': 'wi-day-cloudy-gusts',
        '03n': 'wi-night-cloudy-gusts',
        '04d': 'wi-day-cloudy-gusts',
        '04n': 'wi-night-cloudy-gusts',
        '09d': 'wi-day-sprinkle',
        '09n': 'wi-night-sprinkle',
        '10d': 'wi-day-rain',
        '10n': 'wi-night-rain',
        '11d': 'wi-day-thunderstorm',
        '11n': 'wi-night-thunderstorm',
        '13d': 'wi-day-snow',
        '13n': 'wi-night-snow',
        '50d': 'wi-day-fog',
        '50n': 'wi-night-fog'
      }
      $('.weather-icon').addClass(icons[icon]);
    }

    //wi-day-sunny ==> day-sunny
    function getBackgroundClass(s) {
      s = s.replace('wi-', '');
      return s;
    }

    //Add class to body's background based on icon
    function getBackground() {
      $('body').addClass(getBackgroundClass(icons[icon]));
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
    getIcon();
    getBackground();
  });

});
